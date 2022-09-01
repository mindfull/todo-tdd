import { nanoid } from "nanoid";
import React from "react";
import "./App.css";
import Add from "./components/Add";

interface Todo {
  key: string;
  value: string;
}

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const handleAdd = React.useCallback((newTodo: string) => {
    setTodos((prev) => [...prev, {
      key: nanoid(),
      value: newTodo,
    }]);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="header-title">Todo List</h1>
      </header>
      <main>
        <ul data-testid="list">
          {todos.map(todo => <li key={todo.key}>{todo.value}</li>)}
        </ul>
        <Add onAdd={handleAdd} />
      </main>
    </div>
  );
};

export default App;
