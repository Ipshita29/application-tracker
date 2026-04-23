import { Link } from "react-router-dom";

function Header({ applications, clearAll }) {
  return (
    <div className="header hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video3.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <div className="header-content">
          
          {/* LEFT SIDE */}
          <div className="header-left">
            <h1>Application Tracker</h1>

            {/* ✅ ADD LINKS HERE */}
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Board
              </Link>
              <Link to="/intel" className="nav-link">
                Insights
              </Link>
              <Link to="/vault" className="nav-link">
                Vault
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          {applications.length > 0 && (
            <button className="reset-btn" onClick={clearAll}>
              Reset Tracker
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Header;