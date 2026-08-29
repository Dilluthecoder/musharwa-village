import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-column footer-brand">

          <Link to="/" className="footer-logo">
            🏡 Musharwa Village
          </Link>

          <p>
            Our village, our community, our future.
            Staying connected and growing together.
          </p>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/notices">
            Notices
          </Link>

          <Link to="/gallery">
            Gallery
          </Link>

          <Link to="/feedback">
            Feedback
          </Link>

        </div>


        {/* CONTACT */}
        <div className="footer-column">

          <h3>
            Village Information
          </h3>

          <p>
            📍 Musharwa Village
          </p>

          <p>
            Bihar, India
          </p>

          <a
            href="https://www.google.com/maps?q=27.04739,84.48568"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 View Location
          </a>

        </div>


        {/* COMMUNITY */}
        <div className="footer-column">

          <h3>
            Community
          </h3>

          <p>
            📢 Stay updated with village notices.
          </p>

          <p>
            🖼️ Explore village memories.
          </p>

          <p>
            💬 Share your feedback.
          </p>

        </div>

      </div>


      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 Musharwa Village Portal.
          All rights reserved.
        </p>

        <p>
          Made for the Musharwa community ❤️
        </p>

      </div>

    </footer>
  );
}

export default Footer;