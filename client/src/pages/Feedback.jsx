import { useEffect, useState } from "react";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  async function fetchFeedbacks() {
    try {
      const response = await fetch(
        "https://musharwa-village-1.onrender.com/api/feedback"
      );

      const data = await response.json();

      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  }

  useEffect(() => {
    fetchFeedbacks();
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

    setSuccess("");
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://musharwa-village-1.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        fetchFeedbacks();
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Backend server is not connected.");
    }
  }

  return (
    <main className="feedback-page">

      <section className="page-header">
        <h1>Feedback & Conversation</h1>

        <p>
          Share your ideas, suggestions and feedback with us.
        </p>
      </section>

      {/* Feedback Form */}
      <section className="feedback-container">

        <form className="feedback-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">
              Your Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Your Message
            </label>

            <textarea
              id="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your feedback or suggestion..."
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Send Feedback
          </button>

          {success && (
            <p className="feedback-message">
              {success}
            </p>
          )}

          {error && (
            <p className="feedback-message">
              {error}
            </p>
          )}

        </form>
      </section>

      {/* Feedback List */}
      <section className="feedback-list">

        <div className="page-header">
          <h2>Community Feedback</h2>

          <p>
            See what people are saying about our village.
          </p>
        </div>

        <div className="feedback-cards">

          {feedbacks.length === 0 ? (
            <p className="no-feedback">
              No feedback available yet.
            </p>
          ) : (
            feedbacks.map((feedback) => (
              <div
                className="feedback-card"
                key={feedback._id}
              >
                <h3>{feedback.name}</h3>

                <p>{feedback.message}</p>
              </div>
            ))
          )}

        </div>

      </section>

    </main>
  );
}

export default Feedback;