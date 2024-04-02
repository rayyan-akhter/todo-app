import React from "react";
import "./style.css"

function Filters({ todos, setFilterText, setTodos, fliterText }) {
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => todo.status !== "completed");
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="filters">
      <div className="showRemaining">{todos.length} items left</div>
      <div className="status">
        <div
          className={`all ${fliterText === "" ? "pinkColor" : ""}`}
          onClick={() => setFilterText("")}
        >
          All
        </div>
        <div
          className={`active ${fliterText === "active" ? "pinkColor" : ""}`}
          onClick={() => setFilterText("active")}
        >
          Active
        </div>
        <div
          className={`completed ${
            fliterText === "completed" ? "pinkColor" : ""
          }`}
          onClick={() => setFilterText("completed")}
        >
          Completed
        </div>
      </div>
      <div className="clearCompleted" onClick={clearCompleted}>
        Clear completed
      </div>
    </div>
  );
}

export default Filters;
