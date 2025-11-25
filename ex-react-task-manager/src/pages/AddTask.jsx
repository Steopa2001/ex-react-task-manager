import React, { useState, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

const AddTask = () => {
  const { addTask } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  function validateTitle(value) {
    if (!value.trim()) return "Il titolo è obbligatorio";
    for (let c of value) {
      if (symbols.includes(c)) return "Nessun simbolo speciale nel titolo";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateTitle(title);
    setError(err);
    if (err) return;

    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(task);
      alert("Task aggiunta con successo!");
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (err) {
      alert("Errore: " + err.message);
    }
  }

  return (
    <section>
      <h1 className="mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
          />
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <textarea
            className="form-control"
            placeholder="Task description"
            ref={descriptionRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stato</label>
          <select className="form-select" defaultValue="To do" ref={statusRef}>
            <option>To do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Task
        </button>
      </form>
    </section>
  );
};

export default AddTask;
