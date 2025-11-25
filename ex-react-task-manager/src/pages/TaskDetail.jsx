import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, updateTask, removeTask } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  

  const task = tasks.find(t => String(t.id) === String(id));
  if (!task) return <div>Task non trovata</div>;

  function handleEditClick() {
    setShowEdit(true);
  }

  async function handleSaveEdit(updated) {
    try {
      await updateTask(updated);
      alert("Task modificata con successo!");
      setShowEdit(false);
    } catch (err) {
      alert("Errore: " + err.message);
    }
  }

  function handleCloseEdit() {
    setShowEdit(false);
  }

  async function handleDeleteClick() {
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
      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={handleDeleteClick}>Elimina Task</button>
        <button className="btn btn-warning" onClick={handleEditClick}>Modifica Task</button>
      </div>
      <EditTaskModal
        show={showEdit}
        onClose={handleCloseEdit}
        task={task}
        onSave={handleSaveEdit}
      />
    </section>
  );
};

export default TaskDetail;
