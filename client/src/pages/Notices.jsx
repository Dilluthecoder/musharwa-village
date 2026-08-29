import { useEffect, useState } from "react";

function Notices() {
  const [notices, setNotices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  async function fetchNotices() {
    try {
      const response = await fetch("http://localhost:5000/api/notices");
      const data = await response.json();

      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  function handleChange(event) {
    const { id, value } = event.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!formData.title || !formData.description || !formData.date) {
      setMessage("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);

        setFormData({
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

  return (
    <main className="notices-page">

      <section className="page-header">
        <h1>Notice Board</h1>

        <p>
          Latest updates and important information for our village.
        </p>
      </section>

      {/* Notice List */}
      <section className="notice-container">

        {notices.length === 0 ? (
          <p>No notices available yet.</p>
        ) : (
          notices.map((notice) => (
            <div className="notice-card" key={notice._id}>

              <h2>{notice.title}</h2>

              <p className="notice-date">
                {notice.date}
              </p>

              <p>
                {notice.description}
              </p>

            </div>
          ))
        )}

      </section>

    </main>
  );
}

export default Notices;