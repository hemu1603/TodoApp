import React, { useState } from "react";
import "../styles/AddTodo.css";

const AddTodo = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <button type="submit" className="add-task-button">
        Add Task
      </button>
    </form>
  );
};

export default AddTodo;
