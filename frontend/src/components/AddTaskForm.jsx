import { useState } from "react";
import socket from "../socket";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo", // default column
    };

    socket.emit("add-task", newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
