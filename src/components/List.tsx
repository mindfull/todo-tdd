import React, { FC, useCallback } from "react";
import type { Todo } from "../App";
import ListItem, { ActionType } from "./ListItem";
import "./List.css";

interface ListProps {
  todos: Todo[];
  onChange: (todos: Todo[]) => void;
}

const List: FC<ListProps> = ({ todos, onChange }) => {
  const handleItemChange = useCallback(
    (todo: Todo, actionType: ActionType) => {
      switch (actionType) {
        case "complete":
          onChange(
            todos.map((t) =>
              t.key === todo.key ? { ...t, isComplete: true } : t,
            ),
          );
          return;
        case "remove":
        default:
          onChange(todos.filter((t) => t.key !== todo.key));
          return;
      }
    },
    [todos, onChange],
  );

  return (
    <ul className="List" data-testid="list">
      {todos
        .filter((todo) => !todo.isComplete)
        .map((todo) => (
          <ListItem key={todo.key} item={todo} onChange={handleItemChange} />
        ))}
    </ul>
  );
};

export default List;
