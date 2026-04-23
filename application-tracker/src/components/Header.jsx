import { Link } from "react-router-dom";

function Header({ applications, clearAll }) {
  return (
    <div className="header hero">

      <div className="hero-overlay">
        <div className="header-content">
          
          <div className="header-left">
            <h1>Application Tracker</h1>

            <div className="nav-links">
              <Link to="/" className="nav-link">
                Board
              </Link>
              <Link to="/intel" className="nav-link">
                Insights
              </Link>
              <Link to="/vault" className="nav-link">
                Archived
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;