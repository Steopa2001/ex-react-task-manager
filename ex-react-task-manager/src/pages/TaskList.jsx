import React from "react";

const TaskList = () => {
  return (
    <section>
      <h1 className="mb-4">Task List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example task</td>
            <td>To do</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default TaskList;
