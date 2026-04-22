import { useState } from "react";
import Board from "../components/Board";

function HeistBoard({
  applications,
  moveApplication,
  addApplication,
  deleteApplication,
  toggleArchive,
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleAdd = () => {
    if (!company || !role) return;

    addApplication({
      company,
      role,
    });

    setCompany("");
    setRole("");
  };

  return (
    <>
      {/* ✅ MANUAL INPUT FORM */}
      <div style={{ margin: "20px" }}>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* BOARD */}
      <Board
        applications={applications}
        updateStatus={moveApplication}
        deleteApplication={deleteApplication}
        toggleArchive={toggleArchive}
      />
    </>
  );
}

export default HeistBoard;