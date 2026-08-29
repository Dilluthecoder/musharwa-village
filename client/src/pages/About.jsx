function About() {
  return (
    <main className="about-page">

      {/* =========================
          ABOUT HERO
      ========================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="section-tag">
            ABOUT OUR VILLAGE
          </span>

          <h1>
            About Musharwa Village
          </h1>

          <p>
            Discover Musharwa, its location, community
            and the place we proudly call home.
          </p>

        </div>

      </section>


      {/* =========================
          INTRODUCTION
      ========================= */}

      <section className="about-intro">

        <div className="about-image">

          <img
            src="/images/villagephoto.jpg"
            alt="Musharwa Village"
          />

        </div>


        <div className="about-content">

          <span className="section-tag">
            WELCOME TO MUSHARWA
          </span>

          <h2>
            Our Village,
            <br />
            Our Community
          </h2>

          <p>
            Musharwa is a village in West Champaran
            district of Bihar, India. The village is
            connected with the local Narkatiaganj area
            and is part of the region's rural community.
          </p>

          <p>
            This portal has been created to bring useful
            information about Musharwa Village together
            in one place and to keep the community
            connected with important updates.
          </p>

        </div>

      </section>


      {/* =========================
          VILLAGE INFORMATION
      ========================= */}

      <section className="about-features">

        <div className="section-heading">

          <span className="section-tag">
            VILLAGE INFORMATION
          </span>

          <h2>
            Know Musharwa
          </h2>

          <p>
            Some useful information about our village.
          </p>

        </div>


        <div className="about-feature-grid">

          {/* LOCATION */}

          <div className="about-feature-card location-card">

            <div className="about-feature-icon">
              📍
            </div>

            <h3>
              Our Location
            </h3>

            <p>
              Musharwa, West Champaran, Bihar, India
            </p>

            <a
              href="https://www.google.com/maps?q=27.04739,84.48568"
              target="_blank"
              rel="noopener noreferrer"
              className="location-btn"
            >
              📍 View Location
            </a>

          </div>


          {/* PIN CODE */}

          <div className="about-feature-card">

            <div className="about-feature-icon">
              📮
            </div>

            <h3>
              PIN Code
            </h3>

            <p>
              845455
            </p>

          </div>


          {/* RAILWAY */}

          <div className="about-feature-card">

            <div className="about-feature-icon">
              🚉
            </div>

            <h3>
              Nearby Railway
            </h3>

            <p>
              Sathi Railway Station is a nearby
              railway connection.
            </p>

          </div>


          {/* LOCAL AREA */}

          <div className="about-feature-card">

            <div className="about-feature-icon">
              🏡
            </div>

            <h3>
              Local Area
            </h3>

            <p>
              Musharwa is located in the
              Narkatiaganj area of West Champaran.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          VILLAGE PORTAL
      ========================= */}

      <section className="about-message">

        <div className="about-message-content">

          <span className="section-tag">
            MUSHARWA VILLAGE PORTAL
          </span>

          <h2>
            Our Village,
            <br />
            Our Identity
          </h2>

          <p>
            This portal aims to make village information,
            notices, gallery updates and community
            communication easier to access.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;