import { useState } from "react";
import Board from "../components/Board";
import SmartPaste from "../components/SmartPaste";

function HeistBoard({
  applications,
  moveApplication,
  addApplication,
  deleteApplication,
  toggleArchive,
  updateApplication,
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [isSmartPasteOpen, setIsSmartPasteOpen] = useState(false);

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
      <div className="form">
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={handleAdd}>
          Add Application
        </button>

        <button 
          className="smart-paste-btn" 
          onClick={() => setIsSmartPasteOpen(true)}
        >
          ✨ Smart Paste
        </button>
      </div>

      {isSmartPasteOpen && (
        <SmartPaste 
          onAdd={(data) => {
            addApplication(data);
            setIsSmartPasteOpen(false);
          }} 
          onClose={() => setIsSmartPasteOpen(false)} 
        />
      )}

      {/* BOARD */}
      <Board
        applications={applications}
        updateStatus={moveApplication}
        deleteApplication={deleteApplication}
        toggleArchive={toggleArchive}
        updateApplication={updateApplication}
      />
    </>
  );
}

export default HeistBoard;