import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import "../styles/TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [loading, setLoading] = useState(true); // To show loading state

  // Fetch tasks from API or local storage on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")); // Correct retrieval of tasks
        if (storedTasks && storedTasks.length > 0) {
          // If tasks exist in localStorage, load them
          setTasks(storedTasks);
          setLoading(false);
        } else {
          // Fetch tasks from the API if no tasks are found in localStorage
          const response = await fetch("https://dummyjson.com/todos");
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          const data = await response.json();
          const initialTasks = data.todos.map((todo) => ({
            id: todo.id,
            text: todo.todo,
            completed: todo.completed,
          }));

          // Store tasks in state and persist them in localStorage
          setTasks(initialTasks);
          localStorage.setItem("tasks", JSON.stringify(initialTasks));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Persist tasks in local storage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <AddTodo addTask={addTask} />
      <Filter setFilter={setFilter} activeFilter={filter} />
      <TodoList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TodoApp;
