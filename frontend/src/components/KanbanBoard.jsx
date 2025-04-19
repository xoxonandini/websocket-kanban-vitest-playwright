import { useEffect, useState } from "react";
import socket from "../socket";
import AddTaskForm from "./AddTaskForm";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("initial-data", (data) => setTasks(data));
    socket.on("task-added", (task) => setTasks((prev) => [...prev, task]));

    return () => {
      socket.off("initial-data");
      socket.off("task-added");
    };
  }, []);

  const columns = {
    todo: [],
    inprogress: [],
    done: [],
  };

  tasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <div>
      <AddTaskForm />
      <div className="board">
        {Object.keys(columns).map((status) => (
          <div key={status} className="column">
            <h2>{status.toUpperCase()}</h2>
            {columns[status].map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
