import React, { FC, useCallback } from "react";
import type { Todo } from "../App";
import ListItem, { ActionType } from "./ListItem";
import "./List.css";

interface ListProps {
  todos: Todo[];
  onChange: (todos: Todo[]) => void;
}

const List: FC<ListProps> = ({ todos, onChange }) => {
  const [showComplete, setShowComplete] = React.useState(false);

  const handleItemChange = useCallback(
    (todo: Todo, actionType: ActionType) => {
      switch (actionType) {
        case "complete":
          onChange(
            todos.map((t) =>
              t.key === todo.key ? { ...t, isComplete: !t.isComplete } : t,
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

  const handleShowCompleteToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowComplete(e.target.checked);
    },
    [],
  );

  const renderingTodos = showComplete
    ? todos
    : todos.filter((todo) => !todo.isComplete);

  return (
    <>
      <div className="List-show-complete">
        <input
          id="show-complete"
          data-testid="list-show-complete"
          type="checkbox"
          checked={showComplete}
          onChange={handleShowCompleteToggle}
        />
        <label htmlFor="show-complete">완료한 항목 표시</label>
      </div>
      <ul className="List" data-testid="list">
        {renderingTodos.length > 0 ? (
          renderingTodos.map((todo) => (
            <ListItem key={todo.key} item={todo} onChange={handleItemChange} />
          ))
        ) : (
          <li className="ListItem ListItem-empty">
            목록이 비어있습니다. 여유를 즐기세요!
          </li>
        )}
      </ul>
    </>
  );
};

export default List;
