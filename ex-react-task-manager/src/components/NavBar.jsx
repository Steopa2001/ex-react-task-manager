import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to="/tasks" className="navbar-brand">Task Manager</NavLink>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <NavLink to="/tasks" className={active}>Tasks</NavLink>
            <NavLink to="/tasks/new" className={active}>Add Task</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
