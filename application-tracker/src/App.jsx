import { useState, useEffect } from "react";
import Header from "./components/Header";
import ApplicationForm from "./components/ApplicationForm";
import Board from "./components/Board";
import Insights from "./components/Insights";
import useApplications from "./hooks/useApplications";

function App() {
  const {applications,addApplication,moveApplication,clearAll} = useApplications();

  return (
    <div>
      <Header applications={applications} clearAll={clearAll} />
      <Insights applications={applications} clearAll={clearAll} />
      <ApplicationForm addApplication={addApplication} />
      <Board applications={applications} updateStatus={moveApplication} />
      <section className="why-section">
        <div className="why-card">
          <h2>Why Application Tracker?</h2>

          <p>
            Applying for internships and jobs can quickly become overwhelming.
            This tracker helps you stay organized, focused, and confident throughout
            your application journey.
          </p>

          <div className="why-points">
            <div className="why-item">
              <p>Track applications across every stage in one place</p>
            </div>

            <div className="why-item">
              <p>Visualize progress instead of scrolling through spreadsheets</p>
            </div>

            <div className="why-item">
              <p>Stay motivated by seeing interviews and offers grow</p>
            </div>

            <div className="why-item">
              <p>Designed to mirror real-world applicant tracking systems</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">Application Tracker</p>
        <p className="footer-sub">
          A frontend dashboard for tracking internship & job applications
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
