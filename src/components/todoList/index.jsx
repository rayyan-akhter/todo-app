import React, { useEffect, useState } from "react";
import Todo from "../todo/";
import Filters from "../filters/";
import wavesImg from "../../assets/wave.svg";
import "./style.css"

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [fliterText, setFilterText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (input === "") {
      return alert("Enter something to do...");
    } else {
      const allInput = {
        id: Math.random() * 1000,
        name: input,
        status: "active",
      };
      const updatedTodos = [...todos, allInput];
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    const updateTodo = todos.filter((obj) => obj.id !== id);
    setTodos(updateTodo);
    saveTodosToLocalStorage(updateTodo);
  };

  return (
    <main>
      <img src={wavesImg} alt="wavesImg" className="wavesImg" />
      <div className="child">
        <div className="addForm">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="inputFeild"
            placeholder="Text here"
          />
          <span className="addBtn" onClick={addTodo}>
            Add
          </span>
        </div>
      </div>
      <div className="secondChild">
        <ul className="todoList">
          {todos.length === 0 ? (
            <h1>No task...</h1>
          ) : (
            todos
              .filter((todo) => todo.status.includes(fliterText))
              .map((todo, index) => {
                const isLastTodo = index === todos.length - 1;
                return (
                  <Todo
                    todos={todos}
                    setTodos={setTodos}
                    deleteTodo={deleteTodo}
                    todo={todo}
                    key={todo.id}
                    isLastTodo={isLastTodo}
                  />
                );
              })
          )}
        </ul>
        <Filters
          todos={todos}
          fliterText={fliterText}
          setFilterText={setFilterText}
          setTodos={setTodos}
        />
      </div>
    </main>
  );
};

export default TodoList;
