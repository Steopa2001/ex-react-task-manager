import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
