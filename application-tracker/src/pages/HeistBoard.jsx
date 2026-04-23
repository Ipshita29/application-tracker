import { useState } from "react";
import Board from "../components/Board";
import SmartPaste from "../components/SmartPaste";
import AddModal from "../components/AddModal";

function HeistBoard({
  applications,
  moveApplication,
  addApplication,
  deleteApplication,
  toggleArchive,
  updateApplication,
  clearAll,
}) {
  const [isSmartPasteOpen, setIsSmartPasteOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear ALL data? This cannot be undone.")) {
      clearAll();
    }
  };

  const handleAdd = (data) => {
    const newId = addApplication(data);
    if (newId) {
      setTimeout(() => {
        document.getElementById(`app-${newId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="action-bar">
        <div className="action-bar-left">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="action-bar-right">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            + Add
          </button>

          <button className="btn smart-paste-btn" onClick={() => setIsSmartPasteOpen(true)}>
            Paste JD
          </button>

          {applications.length > 0 && (
            <button className="btn btn-delete" onClick={handleClearAll}>
              Clear All
            </button>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddModal
          onAdd={handleAdd}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isSmartPasteOpen && (
        <SmartPaste
          onAdd={(data) => {
            handleAdd(data);
            setIsSmartPasteOpen(false);
          }}
          onClose={() => setIsSmartPasteOpen(false)}
        />
      )}

      <Board
        applications={filteredApps}
        updateStatus={moveApplication}
        deleteApplication={deleteApplication}
        toggleArchive={toggleArchive}
        updateApplication={updateApplication}
      />
    </>
  );
}

export default HeistBoard;