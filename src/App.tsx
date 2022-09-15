import { v4 as uuid } from "uuid";
import React from "react";
import "./App.css";
import Add from "./components/Add";
import List from "./components/List";
import { fetchList } from "./services/list";
import { LOCAL_STORAGE_KEY } from "./constants";

export interface Todo {
  key: string;
  value: string;
  isComplete?: boolean;
}

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const handleAdd = React.useCallback((newTodo: string) => {
    setTodos((prev) => {
      const newTodos = [
        ...prev,
        {
          key: uuid(),
          value: newTodo,
        },
      ];
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ data: newTodos }),
      );
      return newTodos;
    });
  }, []);

  React.useEffect(() => {
    setTodos(fetchList());
  }, []);

  const handleChange = React.useCallback((newTodos: Todo[]) => {
    setTodos(newTodos);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="header-title">Todo List</h1>
      </header>
      <main className="App-main">
        <List todos={todos} onChange={handleChange} />
        <Add onAdd={handleAdd} />
      </main>
    </div>
  );
};

export default App;
