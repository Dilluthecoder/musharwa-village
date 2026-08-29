import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/admin-login");
      return;
    }

    fetchNotices();
    fetchFeedbacks();
    fetchGallery();
  }, [navigate]);

  // =========================
  // FETCH NOTICES
  // =========================

  async function fetchNotices() {
    try {
      const response = await fetch("http://localhost:5000/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  }

  // =========================
  // FETCH FEEDBACK
  // =========================

  async function fetchFeedbacks() {
    try {
      const response = await fetch("http://localhost:5000/api/feedback");
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  }

  // =========================
  // FETCH GALLERY
  // =========================

  async function fetchGallery() {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      const data = await response.json();

      if (Array.isArray(data)) {
        setGallery(data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  }

  // =========================
  // NOTICE FORM
  // =========================

  function handleNoticeChange(event) {
    const { id, value } = event.target;

    setNoticeForm({
      ...noticeForm,
      [id]: value,
    });
  }

  // =========================
  // ADD NOTICE
  // =========================

  async function handleNoticeSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (
      !noticeForm.title ||
      !noticeForm.description ||
      !noticeForm.date
    ) {
      setMessage("Please fill all the notice fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeForm),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);

        setNoticeForm({
          title: "",
          description: "",
          date: "",
        });

        fetchNotices();
      } else {
        setMessage(data.message || "Failed to add notice.");
      }
    } catch (error) {
      setMessage("Backend server is not connected.");
    }
  }

  // =========================
  // DELETE NOTICE
  // =========================

  async function deleteNotice(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/notices/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchNotices();
      }
    } catch (error) {
      console.error("Failed to delete notice:", error);
    }
  }

  // =========================
  // DELETE FEEDBACK
  // =========================

  async function deleteFeedback(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchFeedbacks();
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  }

  // =========================
  // CHOOSE IMAGE
  // =========================

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  }

  // =========================
  // ADD GALLERY PHOTO
  // =========================

  async function handleGallerySubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!galleryForm.title) {
      setMessage("Please enter photo title.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please choose a photo.");
      return;
    }

    try {
      // Upload image
      const formData = new FormData();

      formData.append("image", selectedFile);

      const uploadResponse = await fetch(
        "http://localhost:5000/api/gallery/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        setMessage(uploadData.message || "Image upload failed.");
        return;
      }

      // Save image information in MongoDB
      const galleryResponse = await fetch(
        "http://localhost:5000/api/gallery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: galleryForm.title,
            image: uploadData.image,
          }),
        }
      );

      const galleryData = await galleryResponse.json();

      if (galleryData.success) {
        setMessage(galleryData.message);

        setGalleryForm({
          title: "",
          image: "",
        });

        setSelectedFile(null);
        setPreview("");

        const fileInput = document.getElementById("gallery-file");

        if (fileInput) {
          fileInput.value = "";
        }

        fetchGallery();
      } else {
        setMessage(
          galleryData.message || "Failed to save gallery photo."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend server is not connected.");
    }
  }

  // =========================
  // DELETE GALLERY
  // =========================

  async function deleteGallery(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery photo?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchGallery();
      }
    } catch (error) {
      console.error("Failed to delete gallery photo:", error);
    }
  }

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  }

  return (
    <main className="admin-page">

      {/* ADMIN HEADER */}

      <section className="page-header">

        <h1>Admin Panel</h1>

        <p>
          Manage village notices, gallery and community feedback.
        </p>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>

      </section>


      {/* DASHBOARD */}

      <section className="admin-container">

        <div className="admin-card">
          <h2>{notices.length}</h2>
          <p>Total Notices</p>
        </div>

        <div className="admin-card">
          <h2>{gallery.length}</h2>
          <p>Gallery Photos</p>
        </div>

        <div className="admin-card">
          <h2>{feedbacks.length}</h2>
          <p>Total Feedback</p>
        </div>

      </section>


      {/* ADD NOTICE */}

      <section className="admin-section">

        <h2>Add New Notice</h2>

        <form onSubmit={handleNoticeSubmit}>

          <div className="form-group">

            <label htmlFor="title">
              Notice Title
            </label>

            <input
              type="text"
              id="title"
              value={noticeForm.title}
              onChange={handleNoticeChange}
              placeholder="Enter notice title"
            />

          </div>


          <div className="form-group">

            <label htmlFor="date">
              Notice Date
            </label>

            <input
              type="date"
              id="date"
              value={noticeForm.date}
              onChange={handleNoticeChange}
            />

          </div>


          <div className="form-group">

            <label htmlFor="description">
              Notice Description
            </label>

            <textarea
              id="description"
              rows="5"
              value={noticeForm.description}
              onChange={handleNoticeChange}
              placeholder="Write notice details..."
            ></textarea>

          </div>


          <button type="submit" className="btn">
            Add Notice
          </button>

        </form>

      </section>


      {/* NOTICE MANAGEMENT */}

      <section className="admin-section">

        <h2>Notice Management</h2>

        {notices.length === 0 ? (

          <p>No notices available.</p>

        ) : (

          notices.map((notice) => (

            <div className="admin-item" key={notice._id}>

              <div>

                <h3>{notice.title}</h3>

                <p>{notice.description}</p>

                <small>
                  Date: {notice.date}
                </small>

              </div>

              <button
                className="delete-btn"
                onClick={() => deleteNotice(notice._id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </section>


      {/* =========================
          ADD GALLERY PHOTO
      ========================= */}

      <section className="admin-section">

        <h2>Add Gallery Photo</h2>

        <form onSubmit={handleGallerySubmit}>

          {/* PHOTO TITLE */}

          <div className="form-group">

            <label htmlFor="gallery-title">
              Photo Title
            </label>

            <input
              type="text"
              id="gallery-title"
              value={galleryForm.title}
              onChange={(event) =>
                setGalleryForm({
                  ...galleryForm,
                  title: event.target.value,
                })
              }
              placeholder="Enter photo title"
            />

          </div>


          {/* CHOOSE PHOTO */}

          <div className="form-group">

            <label htmlFor="gallery-file">
              Choose Photo
            </label>

            <input
              type="file"
              id="gallery-file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
            />

          </div>


          {/* PREVIEW */}

          {preview && (
            <div
              style={{
                marginBottom: "20px",
              }}
            >

              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Photo Preview
              </p>

              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "250px",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  display: "block",
                }}
              />

            </div>
          )}


          <button type="submit" className="btn">
            Upload & Add Photo
          </button>

        </form>


        {message && (
          <p className="feedback-message">
            {message}
          </p>
        )}

      </section>


      {/* GALLERY MANAGEMENT */}

      <section className="admin-section">

        <h2>Gallery Management</h2>

        {gallery.length === 0 ? (

          <p>No gallery photos available.</p>

        ) : (

          gallery.map((item) => (

            <div className="admin-item" key={item._id}>

              <div>

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />

                <h3>{item.title}</h3>

              </div>

              <button
                className="delete-btn"
                onClick={() => deleteGallery(item._id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </section>


      {/* FEEDBACK MANAGEMENT */}

      <section className="admin-section">

        <h2>Feedback Management</h2>

        {feedbacks.length === 0 ? (

          <p>No feedback available.</p>

        ) : (

          feedbacks.map((feedback) => (

            <div className="admin-item" key={feedback._id}>

              <div>

                <h3>{feedback.name}</h3>

                <p>{feedback.message}</p>

                <small>{feedback.email}</small>

              </div>

              <button
                className="delete-btn"
                onClick={() => deleteFeedback(feedback._id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </section>

    </main>
  );
}

export default Admin;