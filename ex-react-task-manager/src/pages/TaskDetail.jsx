import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, removeTask } = useContext(GlobalContext);
  const navigate = useNavigate();

  const task = tasks.find(t => String(t.id) === String(id));
  if (!task) {
    return <div>Task non trovata</div>;
  }

  async function handleDelete() {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      navigate("/tasks");
    } catch (err) {
      alert("Errore: " + err.message);
    }
  }


  return (
    <section>
      <h1 className="mb-4">Dettaglio Task</h1>
      <ul className="list-group mb-4">
        <li className="list-group-item"><strong>Nome:</strong> {task.title}</li>
        <li className="list-group-item"><strong>Descrizione:</strong> {task.description}</li>
        <li className="list-group-item"><strong>Stato:</strong> {task.status}</li>
        <li className="list-group-item"><strong>Data creazione:</strong> {task.createdAt}</li>
      </ul>
      <button className="btn btn-danger" onClick={handleDelete}>Elimina Task</button>
    </section>
  );
};

export default TaskDetail;
