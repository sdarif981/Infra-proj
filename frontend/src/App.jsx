import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API ="";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tasks</h2>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button style={styles.addBtn} onClick={addTask}>
            +
          </button>
        </div>

        {tasks.length === 0 && (
          <p style={styles.empty}>No tasks yet</p>
        )}

        {tasks.map((t) => (
          <div key={t._id} style={styles.task}>
            <span
              onClick={() => toggleTask(t._id)}
              style={{
                ...styles.text,
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "#9bbbd4" : "#0f172a"
              }}
            >
              {t.title}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(t._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eaf6ff", // light sky background
    fontFamily: "system-ui, sans-serif"
  },
  card: {
    width: "360px",
    padding: "24px",
    borderRadius: "14px",
    background: "#ffffff",
    boxShadow: "0 12px 30px rgba(56, 189, 248, 0.15)"
  },
  title: {
    marginBottom: "16px",
    fontWeight: "600",
    fontSize: "18px",
    color: "#0284c7"
  },
  inputRow: {
    display: "flex",
    marginBottom: "12px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #bae6fd",
    outline: "none"
  },
  addBtn: {
    marginLeft: "8px",
    padding: "0 14px",
    borderRadius: "8px",
    border: "none",
    background: "#38bdf8",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "6px",
    background: "#f0f9ff"
  },
  text: {
    cursor: "pointer",
    fontSize: "14px"
  },
  deleteBtn: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer",
    color: "#7dd3fc"
  },
  empty: {
    textAlign: "center",
    color: "#7dd3fc",
    fontSize: "14px"
  }
};

export default App;