function Insights({ applications, clearAll }) {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const offers = applications.filter(a => a.status === "Offer").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  const interviewRate = total
    ? Math.round((interviews / total) * 100)
    : 0;

  return (
    <section className="insights">
      <h2>Insights</h2>

      <div className="insight-grid">
        <div className="insight-card">
          <p>Total Applications</p>
          <h3>{total}</h3>
        </div>

        <div className="insight-card">
          <p>Interviews</p>
          <h3>{interviews} ({interviewRate}%)</h3>
        </div>

        <div className="insight-card">
          <p>Offers</p>
          <h3>{offers}</h3>
        </div>

        <div className="insight-card">
          <p>Rejected</p>
          <h3>{rejected}</h3>
        </div>
      </div>
    </section>
  );
}

export default Insights;
