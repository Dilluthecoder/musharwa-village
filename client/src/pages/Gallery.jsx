import { useEffect, useState } from "react";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const response = await fetch(
        "https://musharwa-village-1.onrender.com/api/gallery"
      );

      const data = await response.json();

      setGallery(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  function getImageUrl(image) {
    if (!image) return "";

    // Uploaded image from backend
    if (image.startsWith("http")) {
      return image;
    }

    // Old local images
    if (image.startsWith("/")) {
      return image;
    }

    return `https://musharwa-village-1.onrender.com/${image}`;
  }

  return (
    <main className="gallery-page">

      <section className="page-header">
        <h1>Village Gallery</h1>

        <p>
          Explore photos and memorable moments of Musharwa Village
        </p>
      </section>

      <section className="gallery-container">

        {loading ? (
          <p>Loading gallery...</p>
        ) : gallery.length === 0 ? (
          <p>No photos available yet.</p>
        ) : (
          gallery.map((item) => (
            <div className="gallery-card" key={item._id}>

              <img
                src={getImageUrl(item.image)}
                alt={item.title}
              />

              <h2>{item.title}</h2>

            </div>
          ))
        )}

      </section>

    </main>
  );
}

export default Gallery;