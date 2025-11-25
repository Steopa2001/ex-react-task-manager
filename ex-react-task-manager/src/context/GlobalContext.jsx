import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    console.log("API URL (dal front):", import.meta.env.VITE_API_URL);
    console.log("Usando apiUrl:", apiUrl);

    fetch(`${apiUrl}/tasks`)
      .then(async res => {
        console.log("Status:", res.status);

        const text = await res.text();
        console.log("Risposta RAW (inizio):", text.substring(0, 500));

        try {
          const data = JSON.parse(text);
          setTasks(data);
          console.log("Task caricati:", data);
        } catch (err) {
          console.error("Errore parsing JSON:", err);
        }
      })
      .catch(err => console.error("Errore Fetch:", err));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
};
