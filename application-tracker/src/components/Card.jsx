import { useDraggable } from "@dnd-kit/core";

function Card({ app, updateStatus, deleteApplication, toggleArchive  }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: app.id,
    });

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card"
    >
      <h4>{app.company}</h4>
      <p>{app.role}</p>

      {/* MOVE BUTTON */}
      {nextStatus[app.status] && (
        <button
          onClick={() =>
            updateStatus(app.id, nextStatus[app.status])
          }
        >
          Move to {nextStatus[app.status]}
        </button>
      )}

      {/* DELETE BUTTON */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => deleteApplication(app.id)}
        style={{
          marginTop: "8px",
          background: "#ff4d4d",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => toggleArchive(app.id)}
        style={{
          marginTop: "8px",
          background: "#555",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Archive
      </button>
    </div>
  );
}

export default Card;