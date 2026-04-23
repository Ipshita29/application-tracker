import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

function Card({ app, updateStatus, deleteApplication, toggleArchive, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: app.id,
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const nextStatus = {
    Applied: "Interview",
    Interview: "Offer",
    Offer: "Rejected",
  };

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue || "");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveEdit = () => {
    if (editingField) {
      if (editValue !== app[editingField]) {
        onUpdate(app.id, editingField, editValue);
      }
    }
    setEditingField(null);
    setEditValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && editingField !== "notes") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card"
    >
      {/* COMPANY */}
      {editingField === "company" ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          className="inline-edit-input"
        />
      ) : (
        <h4 
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => startEdit("company", app.company)}
          className="editable-field"
        >
          {app.company} <span className="edit-icon">✎</span>
        </h4>
      )}

      {/* ROLE */}
      {editingField === "role" ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          className="inline-edit-input"
        />
      ) : (
        <p 
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => startEdit("role", app.role)}
          className="editable-field"
        >
          {app.role} <span className="edit-icon">✎</span>
        </p>
      )}

      {/* STATUS */}
      {editingField === "status" ? (
        <select
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          className="inline-edit-select"
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ) : (
        <p 
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => startEdit("status", app.status)}
          className="editable-field"
        >
          <strong>Status:</strong> {app.status} <span className="edit-icon">✎</span>
        </p>
      )}

      {/* NOTES */}
      {editingField === "notes" ? (
        <textarea
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          className="inline-edit-textarea"
          placeholder="Add notes..."
          rows={3}
        />
      ) : (
        <p 
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => startEdit("notes", app.notes)}
          className="editable-field notes-field"
        >
          <strong>Notes:</strong> {app.notes || "Click to add notes"} <span className="edit-icon">✎</span>
        </p>
      )}

      <div className="card-actions">
        {/* MOVE BUTTON */}
        {nextStatus[app.status] && (
          <button
            className="btn-move"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() =>
              updateStatus(app.id, nextStatus[app.status])
            }
          >
            Move to {nextStatus[app.status]}
          </button>
        )}

        {/* ARCHIVE BUTTON */}
        <button
          className="btn-archive"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => toggleArchive(app.id)}
        >
          Archive
        </button>

        {/* DELETE BUTTON */}
        <button
          className="btn-delete"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => deleteApplication(app.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;