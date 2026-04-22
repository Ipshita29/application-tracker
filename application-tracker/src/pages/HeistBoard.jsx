import Board from "../components/Board";

function HeistBoard({ applications, moveApplication, addApplication, deleteApplication }) {
  return (
    <>
      <button
        onClick={() =>
          addApplication({
            company: "Test Company",
            role: "Frontend Intern",
          })
        }
        style={{
          margin: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        + Quick Add (Temp)
      </button>

      <Board
        applications={applications}
        updateStatus={moveApplication}
        deleteApplication={deleteApplication}
      />
    </>
  );
}

export default HeistBoard;