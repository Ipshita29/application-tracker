import Card from "./Card";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

function Board({ applications, updateStatus }) {
  return (
    <div className="board">
      {statuses.map((status) => {
        const filteredApps = applications.filter(
          (app) => app.status === status
        );

        return (
          <div key={status} className="column">
            <h3>{status}</h3>

            {filteredApps.map((app) => (
              <Card
                key={app.id}
                app={app}
                updateStatus={updateStatus}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;