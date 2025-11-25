import React from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "To do":
      return { backgroundColor: "#f8d7da" }; 
    case "Doing":
      return { backgroundColor: "#fff3cd" }; 
    case "Done":
      return { backgroundColor: "#d4edda" };
    default:
      return {};
  }
};

const TaskRow = React.memo(({ task }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td style={getStatusStyle(task.status)}>{task.status}</td>
      <td>{task.createdAt}</td>
    </tr>
  );
});

export default TaskRow;
