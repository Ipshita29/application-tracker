function Header({ applications, clearAll }) {applications.filter(a => a.status === "Offer").length;

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
          <div className="header-left">
            <h1>Application Tracker</h1>
          </div>

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
