import React, { FC, useCallback, useRef, useState } from "react";
import "./Add.css";

interface AddProps {
  onAdd?: (text: string) => void;
}

const Add: FC<AddProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value && isError) {
      setIsError(false);
    }
  }, [isError]);

  const handleClick = useCallback(() => {
    if (value) {
      onAdd?.(value);
      setValue("");
    } else {
      setIsError(true);
    }
    inputRef.current?.focus();
  }, [value, onAdd]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value) {
        onAdd?.(value);
        setValue("");
        return;
      }

      if (e.key === "Enter") {
        setIsError(true);
      }
    },
    [value, onAdd],
  );

  return (
    <div
      data-testid="add-wrapper"
      className={["Add", isError && "Add-error"].filter((x) => x).join(" ")}
    >
      <input
        className="Add-input"
        value={value}
        type="text"
        data-testid="add-input"
        placeholder="할 일을 입력하세요."
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}
      />
      <button
        className="Add-button"
        type="button"
        data-testid="add-button"
        onClick={handleClick}
      >
        추가
      </button>
    </div>
  );
};

export default Add;
