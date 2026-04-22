import { useState, useEffect } from "react";

export default function useApplications() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app) => {
    const newApp = {
      ...app,
      id: crypto.randomUUID(),
      status: "Applied",
      source: app.source || "Other",
      location: app.location || "",
      deadline: app.deadline || "",
      notes: "",
      archived: false,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activityLog: [
        {
          action: "Created",
          at: new Date().toISOString(),
        },
      ],
    };

    setApplications((prev) => [...prev, newApp]);
  };

  const updateApplication = (id, field, value) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              [field]: value,
              updatedAt: new Date().toISOString(),
              activityLog: [
                ...app.activityLog,
                {
                  action: `Updated ${field}`,
                  at: new Date().toISOString(),
                },
              ],
            }
          : app
      )
    );
  };

  const moveApplication = (id, newStatus) => {
    updateApplication(id, "status", newStatus);
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const clearAll = () => {
    setApplications([]);
    localStorage.removeItem("applications");
  };

  return {
    applications,
    addApplication,
    updateApplication,
    moveApplication,
    deleteApplication,
    clearAll,
  };
}