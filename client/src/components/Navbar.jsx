import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          🏡 <span>Musharwa Village</span>
        </Link>


        {/* DESKTOP / MOBILE MENU */}
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>

          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/notices"
            className={isActive("/notices") ? "active" : ""}
            onClick={closeMenu}
          >
            Notices
          </Link>

          <Link
            to="/gallery"
            className={isActive("/gallery") ? "active" : ""}
            onClick={closeMenu}
          >
            Gallery
          </Link>

          <Link
            to="/feedback"
            className={isActive("/feedback") ? "active" : ""}
            onClick={closeMenu}
          >
            Feedback
          </Link>

        </div>


        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;