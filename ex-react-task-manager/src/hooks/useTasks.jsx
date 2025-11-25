import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Errore GET tasks:", err));
  }, []);

  // Funzione per aggiungere task
  async function addTask(newTask) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    try {
      const res = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (data.success) {
        setTasks(prev => [...prev, data.task]);
        return data.task;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw err;
    }
  }

 
async function removeTask(taskId) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setTasks(prevTasks => prevTasks.filter(task => String(task.id) !== String(taskId)));
      return true;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw err;
  }
}

  function updateTask(taskId, updates) {}

  return { tasks, addTask, removeTask, updateTask };
}
