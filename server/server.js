const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// UPLOAD FOLDER
// =========================

const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}


// =========================
// MULTER CONFIGURATION
// =========================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },

  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      extension;

    cb(null, fileName);
  },
});


const upload = multer({
  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: function (req, file, cb) {

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
    }
  },
});


// =========================
// SERVE UPLOADED IMAGES
// =========================

app.use("/uploads", express.static(uploadFolder));


// =========================
// MONGODB
// =========================

const client = new MongoClient(process.env.MONGO_URI);


async function startServer() {

  try {

    await client.connect();

    console.log("MongoDB connected successfully!");


    const database = client.db("musharwaVillage");


    const feedbackCollection =
      database.collection("feedback");

    const noticeCollection =
      database.collection("notices");

    const galleryCollection =
      database.collection("gallery");


    // =========================
    // HOME ROUTE
    // =========================

    app.get("/", (req, res) => {

      res.send(
        "Musharwa Village Backend is Running!"
      );

    });


    // ==================================================
    // FEEDBACK API
    // ==================================================

    // ADD FEEDBACK

    app.post("/api/feedback", async (req, res) => {

      try {

        const {
          name,
          email,
          message
        } = req.body;


        if (!name || !email || !message) {

          return res.status(400).json({
            success: false,
            message: "Please fill all the fields.",
          });

        }


        await feedbackCollection.insertOne({

          name,
          email,
          message,

          createdAt: new Date(),

        });


        res.json({

          success: true,
          message: "Feedback saved successfully!",

        });

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to save feedback.",

        });

      }

    });


    // GET FEEDBACK

    app.get("/api/feedback", async (req, res) => {

      try {

        const feedbacks =
          await feedbackCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();


        res.json(feedbacks);

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to fetch feedback.",

        });

      }

    });


    // DELETE FEEDBACK

    app.delete("/api/feedback/:id", async (req, res) => {

      try {

        const { id } = req.params;


        const result =
          await feedbackCollection.deleteOne({

            _id: new ObjectId(id),

          });


        if (result.deletedCount === 0) {

          return res.status(404).json({

            success: false,
            message: "Feedback not found.",

          });

        }


        res.json({

          success: true,
          message: "Feedback deleted successfully!",

        });

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to delete feedback.",

        });

      }

    });


    // ==================================================
    // NOTICE API
    // ==================================================

    // GET NOTICES

    app.get("/api/notices", async (req, res) => {

      try {

        const notices =
          await noticeCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();


        res.json(notices);

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to fetch notices.",

        });

      }

    });


    // ADD NOTICE

    app.post("/api/notices", async (req, res) => {

      try {

        const {
          title,
          description,
          date
        } = req.body;


        if (!title || !description || !date) {

          return res.status(400).json({

            success: false,
            message: "Please fill all the fields.",

          });

        }


        await noticeCollection.insertOne({

          title,
          description,
          date,

          createdAt: new Date(),

        });


        res.json({

          success: true,
          message: "Notice added successfully!",

        });

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to add notice.",

        });

      }

    });


    // DELETE NOTICE

    app.delete("/api/notices/:id", async (req, res) => {

      try {

        const { id } = req.params;


        const result =
          await noticeCollection.deleteOne({

            _id: new ObjectId(id),

          });


        if (result.deletedCount === 0) {

          return res.status(404).json({

            success: false,
            message: "Notice not found.",

          });

        }


        res.json({

          success: true,
          message: "Notice deleted successfully!",

        });

      } catch (error) {

        console.error(error);


        res.status(500).json({

          success: false,
          message: "Failed to delete notice.",

        });

      }

    });


    // ==================================================
    // GALLERY API
    // ==================================================

    // GET ALL GALLERY PHOTOS

    app.get("/api/gallery", async (req, res) => {

      try {

        const gallery =
          await galleryCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();


        res.json(gallery);

      } catch (error) {

        console.error(
          "Failed to fetch gallery:",
          error
        );


        res.status(500).json({

          success: false,
          message: "Failed to fetch gallery.",

        });

      }

    });


    // ==================================================
    // UPLOAD IMAGE
    // ==================================================

    app.post(
      "/api/gallery/upload",
      upload.single("image"),
      async (req, res) => {

        try {

          if (!req.file) {

            return res.status(400).json({

              success: false,
              message: "Please select an image.",

            });

          }


          const imageUrl =
            `http://localhost:${PORT}/uploads/${req.file.filename}`;


          console.log(
            "Image uploaded:",
            imageUrl
          );


          res.json({

            success: true,

            message: "Image uploaded successfully!",

            image: imageUrl,

          });

        } catch (error) {

          console.error(
            "Image upload failed:",
            error
          );


          res.status(500).json({

            success: false,
            message: "Image upload failed.",

          });

        }

      }
    );


    // ==================================================
    // ADD GALLERY PHOTO TO MONGODB
    // ==================================================

    app.post("/api/gallery", async (req, res) => {

      try {

        const {
          title,
          image
        } = req.body;


        if (!title || !image) {

          return res.status(400).json({

            success: false,
            message:
              "Please fill all the gallery fields.",

          });

        }


        await galleryCollection.insertOne({

          title,
          image,

          createdAt: new Date(),

        });


        res.json({

          success: true,

          message:
            "Gallery photo added successfully!",

        });

      } catch (error) {

        console.error(
          "Failed to add gallery photo:",
          error
        );


        res.status(500).json({

          success: false,

          message:
            "Failed to add gallery photo.",

        });

      }

    });


    // ==================================================
    // DELETE GALLERY PHOTO
    // ==================================================

    app.delete("/api/gallery/:id", async (req, res) => {

      try {

        const { id } = req.params;


        const photo =
          await galleryCollection.findOne({

            _id: new ObjectId(id),

          });


        if (!photo) {

          return res.status(404).json({

            success: false,

            message:
              "Gallery photo not found.",

          });

        }


        // Delete image file from uploads folder
        if (
          photo.image &&
          photo.image.includes("/uploads/")
        ) {

          const fileName =
            photo.image.split("/uploads/")[1];


          const filePath =
            path.join(
              uploadFolder,
              fileName
            );


          if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

          }

        }


        // Delete MongoDB record

        await galleryCollection.deleteOne({

          _id: new ObjectId(id),

        });


        res.json({

          success: true,

          message:
            "Gallery photo deleted successfully!",

        });

      } catch (error) {

        console.error(
          "Failed to delete gallery photo:",
          error
        );


        res.status(500).json({

          success: false,

          message:
            "Failed to delete gallery photo.",

        });

      }

    });


    // ==================================================
    // MULTER ERROR HANDLER
    // ==================================================

    app.use((error, req, res, next) => {

      if (
        error instanceof multer.MulterError
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Image upload error: " +
            error.message,

        });

      }


      if (error) {

        return res.status(400).json({

          success: false,

          message: error.message,

        });

      }


      next();

    });


    // ==================================================
    // START SERVER
    // ==================================================

    app.listen(PORT, () => {

      console.log(
        `Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error
    );

  }

}


startServer();