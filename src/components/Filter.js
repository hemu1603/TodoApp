import React from "react";
import "../styles/Filter.css";

const Filter = ({ setFilter, activeFilter }) => {
  return (
    <div className="filter-container">
      <button
        onClick={() => setFilter("all")}
        className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`filter-button ${activeFilter === "completed" ? "active" : ""}`}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={`filter-button ${activeFilter === "pending" ? "active" : ""}`}
      >
        Pending
      </button>
    </div>
  );
};

export default Filter;
