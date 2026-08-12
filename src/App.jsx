import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>To-do list</h1>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={styles.emptyState}>No tasks yet. Add one above.</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    ...styles.text,
                    ...(todo.done ? styles.textDone : {}),
                  }}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <p style={styles.footer}>
          {doneCount} of {todos.length} done
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "0 auto",
    padding: "24px",
    fontFamily: "system-ui, sans-serif",
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
  },
  addButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: 6,
    backgroundColor: "#111827",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
  emptyState: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    padding: "24px 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    backgroundColor: "#f9fafb",
    borderRadius: 6,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    cursor: "pointer",
  },
  text: {
    color: "#111827",
  },
  textDone: {
    color: "#9ca3af",
    textDecoration: "line-through",
  },
  deleteButton: {
    border: "none",
    background: "transparent",
    color: "#9ca3af",
    fontSize: 18,
    lineHeight: 1,
    cursor: "pointer",
    padding: "0 4px",
  },
  footer: {
    marginTop: 16,
    fontSize: 13,
    color: "#6b7280",
  },
};

