import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <img
          src="/images/villagephoto.jpg"
          alt="Musharwa Village"
          className="hero-image"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-badge">
            🌿 Our Village • Our Community
          </div>

          <h1>
            Welcome to
            <br />
            <span>Musharwa Village</span>
          </h1>

          <p>
            Discover our village, people, culture,
            events and community.
          </p>

          <div className="hero-buttons">

            <Link
              to="/about"
              className="btn hero-main-btn"
            >
              Explore Village
              <span>→</span>
            </Link>

            <Link
              to="/notices"
              className="btn secondary-btn"
            >
              View Notices
            </Link>

          </div>

        </div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>

      </section>


      {/* =========================
          ABOUT SECTION
      ========================= */}

      <section className="home-about">

        <div className="home-about-content">

          <span className="section-tag">
            ABOUT MUSHARWA
          </span>

          <h2>
            A Village Connected
            <br />
            by Community
          </h2>

          <p>
            Musharwa is a village with a strong sense
            of community, culture and togetherness.
            This digital portal brings important
            information and village updates together
            in one place.
          </p>

          <Link
            to="/about"
            className="btn"
          >
            Learn More →
          </Link>

        </div>

        <div className="about-highlight">

          <div className="highlight-icon">
            🏡
          </div>

          <h3>
            Our Village
          </h3>

          <p>
            Together we grow, celebrate and build
            a better community.
          </p>

        </div>

      </section>


      {/* =========================
          VILLAGE INFORMATION
      ========================= */}

      <section className="quick-info">

        <div className="section-heading">

          <span className="section-tag">
            OUR VILLAGE
          </span>

          <h2>
            Village Information
          </h2>

          <p>
            Get a quick look at important information
            about our community.
          </p>

        </div>


        <div className="info-container">

          <div className="info-card">

            <div className="info-icon">
              📍
            </div>

            <div>

              <h3>
                Location
              </h3>

              <p>
                Musharwa Village, Bihar, India
              </p>

            </div>

          </div>


          <div className="info-card">

            <div className="info-icon">
              👥
            </div>

            <div>

              <h3>
                Community
              </h3>

              <p>
                A connected and growing community
              </p>

            </div>

          </div>


          <div className="info-card">

            <div className="info-icon">
              📢
            </div>

            <div>

              <h3>
                Updates
              </h3>

              <p>
                Latest village notices and announcements
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          EXPLORE SECTION
      ========================= */}

      <section className="features">

        <div className="section-heading">

          <span className="section-tag">
            EXPLORE
          </span>

          <h2>
            Discover Our Village
          </h2>

          <p>
            Explore everything our village portal has
            to offer.
          </p>

        </div>


        <div className="feature-container">

          {/* ABOUT */}

          <div className="feature-card">

            <div className="feature-icon">
              🏡
            </div>

            <h3>
              About Village
            </h3>

            <p>
              Learn more about Musharwa,
              its people and community.
            </p>

            <Link
              to="/about"
              className="card-link"
            >
              Explore
              <span>→</span>
            </Link>

          </div>


          {/* NOTICES */}

          <div className="feature-card">

            <div className="feature-icon">
              📢
            </div>

            <h3>
              Latest Notices
            </h3>

            <p>
              Stay updated with important
              village announcements.
            </p>

            <Link
              to="/notices"
              className="card-link"
            >
              View Notices
              <span>→</span>
            </Link>

          </div>


          {/* GALLERY */}

          <div className="feature-card">

            <div className="feature-icon">
              🖼️
            </div>

            <h3>
              Village Gallery
            </h3>

            <p>
              Explore memorable moments,
              places and events.
            </p>

            <Link
              to="/gallery"
              className="card-link"
            >
              View Gallery
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          COMMUNITY CTA
      ========================= */}

      <section className="home-cta">

        <div className="cta-content">

          <span className="section-tag">
            MUSHARWA COMMUNITY
          </span>

          <h2>
            Stay Connected With
            <br />
            Our Village
          </h2>

          <p>
            Keep up with the latest notices,
            updates and memories of Musharwa.
          </p>

          <div className="cta-buttons">

            <Link
              to="/notices"
              className="btn"
            >
              Latest Notices →
            </Link>

            <Link
              to="/feedback"
              className="btn cta-outline-btn"
            >
              Give Feedback
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;