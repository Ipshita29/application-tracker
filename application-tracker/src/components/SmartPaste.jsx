import { useState, useEffect } from "react";

function SmartPaste({ onAdd, onClose }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleExtract = async () => {
      if (!description.trim()) return;

      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/.netlify/functions/groq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: description }),
        });

        const data = await res.json();

        // 🔥 Proper error handling
        if (!res.ok) {
          throw new Error(data.error || "Request failed");
        }

        if (!data.content) {
          throw new Error("No response from AI");
        }

        // 🔥 Extract JSON safely
        const match = data.content.match(/\{[\s\S]*\}/);

        if (!match) {
          throw new Error("Invalid AI format");
        }

        const parsed = JSON.parse(match[0]);

        setParsedData(parsed);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

  const handleConfirm = () => {
    if (parsedData) {
      onAdd(parsedData);
      onClose();
    }
  };

  const handleFieldChange = (field, value) => {
    setParsedData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Smart Paste</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!parsedData && !isLoading && (
          <div className="modal-body">
            <p>Paste job description here.</p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job posting text..."
              rows={10}
              className="smart-textarea"
            />

            {error && <p className="error-text">{error}</p>}

            <button className="btn btn-primary" onClick={handleExtract}>
              {isLoading ? "Extracting..." : "Extract Information"}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="modal-body loading-body">
            <div className="spinner"></div>
            <p>Processing the job description…</p>
          </div>
        )}

        {parsedData && !isLoading && (
          <div className="modal-body">
            <p className="success-text">Intel extracted! Review and confirm.</p>

            <div className="smart-form">
              <label>
                Company:
                <input
                  value={parsedData.company || ""}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                />
              </label>

              <label>
                Role:
                <input
                  value={parsedData.role || ""}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                />
              </label>

              <label>
                Location:
                <input
                  value={parsedData.location || ""}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                />
              </label>

              <label>
                Source:
                <input
                  value={parsedData.source || ""}
                  onChange={(e) => handleFieldChange("source", e.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm Adding Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartPaste;