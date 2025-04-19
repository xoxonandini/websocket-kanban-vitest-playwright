import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('loadTasks', (data) => {
      setTasks(data);
    });

    return () => socket.disconnect();
  }, []);

  const addTask = () => {
    if (input.trim()) {
      socket.emit('addTask', input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🗂️ Simple Kanban Board</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ marginTop: '1rem' }}>
        {tasks.map((task, index) => (
          <li key={index}>✅ {task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
