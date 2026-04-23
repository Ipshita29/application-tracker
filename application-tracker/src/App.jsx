import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import useApplications from "./hooks/useApplications";
import HeistBoard from "./pages/HeistBoard";
import Intel from "./pages/Intel";
import Vault from "./pages/Vault";

function App() {
  const {
    applications,
    addApplication,
    moveApplication,
    clearAll,
    deleteApplication,
    toggleArchive,
    updateApplication,
  } = useApplications();

  return (
    <div className="app-container">
      <Header applications={applications} clearAll={clearAll} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeistBoard
                  applications={applications}
                  moveApplication={moveApplication}
                  addApplication={addApplication}
                  deleteApplication={deleteApplication}
                  toggleArchive={toggleArchive}
                  updateApplication={updateApplication}
                  clearAll={clearAll}
                />
                <section className="why-section">
                  <div className="why-card">
                    <h2>Stay in Control of Your Job Search</h2>

                    <p>
                      Managing multiple job applications can quickly become overwhelming.
                      Keep everything organized in one place and stay focused on what matters.
                    </p>

                    <div className="why-points">
                      <div className="why-item">
                        <p>Track applications across every stage</p>
                      </div>

                      <div className="why-item">
                        <p>Visualize your progress clearly</p>
                      </div>

                      <div className="why-item">
                        <p>Stay organized without spreadsheets</p>
                      </div>

                      <div className="why-item">
                        <p>Focus on getting interviews</p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            }
          />
          <Route
            path="/intel"
            element={<Intel applications={applications} />}
          />
          <Route
            path="/vault"
            element={
              <Vault
                applications={applications}
                toggleArchive={toggleArchive}
              />
            }
          />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-title">Application Tracker</p>
          <p className="footer-sub">
            Track your job applications with clarity and control.
          </p>
          <div className="footer-meta">
            <span>Built with React</span>
            <span>•</span>
            <span>Designed by Ipshita ♥︎</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;