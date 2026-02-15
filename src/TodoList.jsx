import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "Eat", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setnewTodo] = useState("");

  let addTodo = () => {
    setTodos((prevTodo) => {
      return [...prevTodo, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setnewTodo("");
  };

  let updateTodoValue = (event) => {
    setnewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};


  let markAsDoneAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      }),
    );
  };

  let markAsDoneOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  return (
    <div className="card">
      <h1>Todo List </h1>
      <div className="input-row">
        <input
          placeholder="Add a Todo"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add" onClick={addTodo}>
          Add
        </button>
      </div>
      <h4>My Todos</h4>
      <ol>
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => markAsDoneOne(todo.id)}
              />
              <span className="number" />
              <span className={todo.isDone ? "done" : ""}>{todo.task}</span>
            </div>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </li>
        ))}
      </ol>
      <br />
      <button className="marked" onClick={markAsDoneAll}>
        Mark All as Done{" "}
      </button>
    </div>
  );
}
