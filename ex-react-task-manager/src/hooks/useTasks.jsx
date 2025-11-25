import { useState, useEffect } from "react";

// Hook personalizzato per task
export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Errore loading tasks:", err));
  }, []);

  // Funzioni CRUD (al momento vuote)
  function addTask(newTask) {
    // da implementare
  }
  function removeTask(taskId) {
    // da implementare
  }
  function updateTask(taskId, updates) {
    // da implementare
  }

  // Valori restituiti dal custom hook
  return { tasks, addTask, removeTask, updateTask };
}
