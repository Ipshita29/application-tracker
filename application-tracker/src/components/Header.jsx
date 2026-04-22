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
            <div style={{ marginTop: "10px" }}>
              <Link to="/" style={{ marginRight: "15px" }}>
                Board
              </Link>
              <Link to="/intel" style={{ marginRight: "15px" }}>
                Insights
              </Link>
              <Link to="/vault">
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