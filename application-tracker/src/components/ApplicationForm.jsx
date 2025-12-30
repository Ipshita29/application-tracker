import { useState } from "react";

function ApplicationForm({ addApplication }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !role) return;

    addApplication({
      id: Date.now(),
      company,
      role,
      status: "Applied",
    });

    setCompany("");
    setRole("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ApplicationForm;
