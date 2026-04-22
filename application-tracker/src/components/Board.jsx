import Card from "./Card";
import { DndContext, useDroppable } from "@dnd-kit/core";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

// 🔹 Column component (needed for hook usage)
function Column({ status, applications, updateStatus, deleteApplication, toggleArchive }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="column">
      <h3>{status}</h3>

      {applications.map((app) => (
        <Card
          key={app.id}
          app={app}
          updateStatus={updateStatus}
          deleteApplication={deleteApplication}
          toggleArchive={toggleArchive}
        />
      ))}
    </div>
  );
}

function Board({ applications, updateStatus, deleteApplication, toggleArchive }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const id = active.id;
    const newStatus = over.id;

    updateStatus(id, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        {statuses.map((status) => {
        const filteredApps = applications.filter(
          (app) => app.status === status && !app.archived
        );

        return (
          <Column
            key={status}
            status={status}
            applications={filteredApps}
            updateStatus={updateStatus}
            deleteApplication={deleteApplication}
            toggleArchive={toggleArchive}
          />
        );
      })}
      </div>
    </DndContext>
  );
}

export default Board;