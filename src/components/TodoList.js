import React from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

const TodoList = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <ul className="todo-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <li className="empty-message">No tasks available</li>
      )}
    </ul>
  );
};

export default TodoList;
