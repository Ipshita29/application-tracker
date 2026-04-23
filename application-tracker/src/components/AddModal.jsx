import { useState, useEffect } from "react";

function AddModal({ onAdd, onClose }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter") {
        handleAdd();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleAdd = () => {
    if (!company.trim() || !role.trim()) return;
    onAdd({ company, role });
    onClose();
  };

  return (
    <div className="modal-overlay" onPointerDown={onClose}>
      <div className="modal-content" onPointerDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Application</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="smart-form">
            <label>
              Company:
              <input
                autoFocus
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
              />
            </label>
            <label>
              Role:
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
              />
            </label>
          </div>
          
          <button className="btn btn-primary" onClick={handleAdd} style={{ width: "100%" }}>
            Confirm Addition
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
