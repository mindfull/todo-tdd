import React, { FC, useCallback } from "react";
import type { Todo } from "../App";
import "./ListItem.css";

export type ActionType = "complete" | "remove";

interface ListItemProps {
  item: Todo;
  onChange: (item: Todo, actionType: ActionType) => void;
}

const ListItem: FC<ListItemProps> = ({ item, onChange }) => {
  const handleComplete = useCallback(() => {
    onChange(item, "complete");
  }, [item, onChange]);

  const handleRemove = useCallback(() => {
    onChange(item, "remove");
  }, [item, onChange]);

  return (
    <li className="ListItem" data-testid="list-item">
      <button
        type="button"
        className={`ListItem-complete ${
          item.isComplete ? "ListItem-complete--completed" : ""
        }`}
        data-testid={`list-item-complete-${item.key}`}
        onClick={handleComplete}
      >
        완료
      </button>
      <span>{item.value}</span>
      <button
        type="button"
        className="ListItem-remove"
        data-testid={`list-item-remove-${item.key}`}
        onClick={handleRemove}
      >
        삭제
      </button>
    </li>
  );
};

export default ListItem;
