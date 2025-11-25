import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, removeTask } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const task = tasks.find(t => String(t.id) === String(id));
  if (!task) return <div>Task non trovata</div>;

  function handleDeleteClick() {
    setShowModal(true);
  }

  async function handleConfirmDelete() {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      setShowModal(false);
      navigate("/tasks");
    } catch (err) {
      setShowModal(false);
      alert("Errore: " + err.message);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
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
      <button className="btn btn-danger" onClick={handleDeleteClick}>Elimina Task</button>
      <Modal
        show={showModal}
        title="Conferma eliminazione"
        content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        confirmText="Elimina"
      />
    </section>
  );
};

export default TaskDetail;
