function Vault({ applications, toggleArchive }) {
  const archivedApps = applications.filter((app) => app.archived);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Vault (Archived)</h2>

      {archivedApps.length === 0 && <p>No archived applications</p>}

      {archivedApps.map((app) => (
        <div key={app.id} style={{ marginBottom: "15px" }}>
          <h4>{app.company}</h4>
          <p>{app.role}</p>

          <button onClick={() => toggleArchive(app.id)}>
            Restore
          </button>
        </div>
      ))}
    </div>
  );
}

export default Vault;