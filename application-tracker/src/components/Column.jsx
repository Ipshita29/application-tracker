import Card from "./Card";

function Column({ title, applications, updateStatus }) {
  return (
    <div className="column">
      <h3>{title}</h3>
      {applications.map((app) => (
        <Card
          key={app.id}
          app={app}
          updateStatus={updateStatus}
        />
      ))}
    </div>
  );
}

export default Column;
