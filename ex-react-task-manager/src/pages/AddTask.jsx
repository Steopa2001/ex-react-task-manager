import React from "react";

const AddTask = () => {
  return (
    <section>
      <h1 className="mb-4">Add Task</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" placeholder="Task title" disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" placeholder="Task description" disabled></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" disabled>
            <option>To do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled>Save (disabled)</button>
      </form>
    </section>
  );
};

export default AddTask;
