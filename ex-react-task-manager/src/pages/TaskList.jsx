import React, { useContext, useState, useRef, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
  // Ordinamento
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  // Ricerca con debounce
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef();

  const { tasks } = useContext(GlobalContext);

  // Funzione ordinamento
  function handleSort(col) {
    if (sortBy === col) {
      setSortOrder(prev => prev * -1);
    } else {
      setSortBy(col);
      setSortOrder(1);
    }
  }

  // Input di ricerca con debounce
  function handleSearchInput(e) {
    const value = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 400);
  }

  // Array ordinato
  const orderedTasks = useMemo(() => {
    let sorted = [...tasks];
    if (sortBy === "title") {
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title) * sortOrder
      );
    } else if (sortBy === "status") {
      const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
      sorted.sort((a, b) =>
        (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
      );
    } else if (sortBy === "createdAt") {
      sorted.sort((a, b) =>
        (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder
      );
    }
    return sorted;
  }, [tasks, sortBy, sortOrder]);

  // Array filtrato e ordinato
  const filteredTasks = useMemo(() => {
    let filtered = orderedTasks;
    if (debouncedQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      );
    }
    return filtered;
  }, [orderedTasks, debouncedQuery]);

  return (
    <section>
      <h1 className="mb-4">Task List</h1>
      <input
        type="search"
        className="form-control mb-3"
        placeholder="Cerca task per nome..."
        onChange={handleSearchInput}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
              Nome {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("status")}>
              Stato {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("createdAt")}>
              Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TaskList;
