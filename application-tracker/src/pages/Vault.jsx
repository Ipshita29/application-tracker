function Vault({ applications, toggleArchive }) {
  const archivedApps = applications.filter((app) => app.archived);

  return (
    <div className="insights">
      <h2>Archived</h2>

      {archivedApps.length === 0 && <p style={{ color: "var(--text-muted)" }}>No archived applications</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {archivedApps.map((app) => (
          <div key={app.id} className="card">
            <h4>{app.company}</h4>
            <p>{app.role}</p>

            <button onClick={() => toggleArchive(app.id)}>
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vault;