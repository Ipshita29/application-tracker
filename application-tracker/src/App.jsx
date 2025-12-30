import { useState } from "react";
import Header from "./components/Header";
import ApplicationForm from "./components/ApplicationForm";
import Board from "./components/Board";

function App() {
  const [applications, setApplications] = useState([]);

  const addApplication = (app) => {
    setApplications([...applications, app]);
  };

  const updateStatus = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div>
      <Header applications={applications} />
      <ApplicationForm addApplication={addApplication} />
      <Board applications={applications} updateStatus={updateStatus} />
    </div>
  );
}

export default App;
