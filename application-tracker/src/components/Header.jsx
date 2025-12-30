function Header({ applications }) {
  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  return (
    <div className="header">
      <h1>Application Tracker</h1>
      <p>
        Total: {total} | Interviews: {interviews} | Offers: {offers}
      </p>
    </div>
  );
}

export default Header;
