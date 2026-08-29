import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    setError("");

    if (password === "admin123") {
      sessionStorage.setItem("adminLoggedIn", "true");

      navigate("/admin");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-container">

        <h1>Admin Login</h1>

        <p>Enter admin password to continue.</p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          {error && (
            <p className="feedback-message">
              {error}
            </p>
          )}

        </form>

      </section>
    </main>
  );
}

export default AdminLogin;