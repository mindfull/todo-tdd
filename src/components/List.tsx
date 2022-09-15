import React, { FC } from "react";
import type { Todo } from "../App";

interface ListProps {
  todos: Todo[];
  onChange: (todos: Todo[]) => void;
}

const List: FC<ListProps> = ({ todos, onChange }) => {
  return (
    <ul data-testid="list">
      {todos
        .filter((todo) => !todo.isComplete)
        .map((todo) => (
          <li key={todo.key} data-testid="list-item">
            {todo.value}
            <button
              type="button"
              data-testid={`list-item-remove-${todo.key}`}
              onClick={() => {
                onChange(todos.filter((t) => t.key !== todo.key));
              }}
            >
              삭제
            </button>
          </li>
        ))}
    </ul>
  );
};

export default List;
