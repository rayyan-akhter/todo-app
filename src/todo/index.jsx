import React, { useState } from "react";
import correctIcon from "../assets/correct.png";
import crossIcon from "../assets/cross.png";
import editIcon from "../assets/edit.png";
import "./style.css"

function Todo({ deleteTodo, todo, todos, setTodos, isLastTodo }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todo.name);
  const [done, setDone] = useState(todo?.status === "completed");

  const onInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const saveChanges = () => {
    if (inputValue === "") {
      deleteTodo(todo.id);
    } else {
      const updatedTodos = [...todos];
      setDone(false);
      const idx = todos.findIndex((obj) => obj.id === todo.id);
      updatedTodos[idx].name = inputValue;
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    setEditMode(false);
  };

  const toggleDone = () => {
    const updatedTodos = [...todos];
    const idx = todos.findIndex((obj) => obj.id === todo.id);
    updatedTodos[idx].status =
      updatedTodos[idx].status === "active" ? "completed" : "active";
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setDone((prev) => !prev);
  };

  return (
    <li className={`todo ${isLastTodo ? "lastTodo" : ""}`}>
      <div className="todoWrapper">
        <div className="todoInnerContainer">
          <img
            src={correctIcon}
            alt="correctIcon"
            className="icon"
            onClick={toggleDone}
          />
          {editMode ? (
            <input value={inputValue} onChange={onInputChange} />
          ) : (
            <p className={done ? "inputValue" : ""}>{inputValue}</p>
          )}
        </div>
        <div className="iconContainer">
          {!done && todo.status === "active" && (
            <>
              {!editMode ? (
                <img
                  src={editIcon}
                  alt="edit icon"
                  className="icon"
                  onClick={() => setEditMode(true)}
                />
              ) : (
                <button onClick={saveChanges}>done</button>
              )}
            </>
          )}
          <img
            src={crossIcon}
            alt="delete icon"
            className="icon"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      </div>
    </li>
  );
}

export default Todo;
