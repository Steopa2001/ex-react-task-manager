import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState(task?.status ?? "To do");
  const editFormRef = useRef();

  // aggiorna lo stato quando cambia la task (per riutilizzo modale)
  useEffect(() => {
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
    setStatus(task?.status ?? "To do");
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();
    const updated = {
      ...task,
      title,
      description,
      status
    };
    onSave(updated);
  }

  function handleModalConfirm() {
    if (editFormRef.current) {
      editFormRef.current.requestSubmit();
    }
  }

  const content = (
    <form ref={editFormRef} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descrizione</label>
        <textarea
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Stato</label>
        <select
          className="form-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>To do</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      show={show}
      title="Modifica Task"
      content={content}
      confirmText="Salva"
      onClose={onClose}
      onConfirm={handleModalConfirm}
    />
  );
};

export default EditTaskModal;
