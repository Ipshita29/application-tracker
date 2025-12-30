import Column from "./Column";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

function Board({ applications, updateStatus }) {
  return (
    <div className="board">
      {statuses.map((status) => (
        <Column
          key={status}
          title={status}
          applications={applications.filter(
            (app) => app.status === status
          )}
          updateStatus={updateStatus}
        />
      ))}
    </div>
  );
}

export default Board;
