import React from "react";
import "../styles/TodoItem.css";

const TodoItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(task.id)} className="task-text">
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
