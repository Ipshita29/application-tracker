function Card({ app, updateStatus }) {
  const nextStatus = {
    Applied: "Interview",
    Interview: "Offer",
    Offer: "Rejected",
  };

  return (
    <div className="card">
      <h4>{app.company}</h4>
      <p>{app.role}</p>

      {nextStatus[app.status] && (
        <button
          onClick={() =>
            updateStatus(app.id, nextStatus[app.status])
          }
        >
          Move to {nextStatus[app.status]}
        </button>
      )}
    </div>
  );
}

export default Card;
