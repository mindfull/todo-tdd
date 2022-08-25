import React, { FC, useCallback, useState } from "react";

interface AddProps {
  onAdd?: (text: string) => void;
}

const Add: FC<AddProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    onAdd?.(value);
    setValue("");
  }, [value, onAdd]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onAdd?.(value);
        setValue("");
      }
    },
    [value, onAdd],
  );

  return (
    <>
      <input
        value={value}
        type="text"
        data-testid="add-input"
        placeholder="할 일을 입력하세요."
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <button type="button" data-testid="add-button" onClick={handleClick}>
        추가
      </button>
    </>
  );
};

export default Add;
