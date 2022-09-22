import { fireEvent, render, screen } from "@testing-library/react";
import List from "./List";

describe("List", () => {
  it("삭제 버튼 클릭 시 해당 항목을 제외한 목록이 onChange의 인자로 전달돼야 한다.", () => {
    // given
    const todos = [
      { key: "1", value: "Lorem Ipusm" },
      { key: "2", value: "Dolor Sit" },
      { key: "3", value: "Amet" },
    ];
    const onChange = jest.fn();
    render(<List todos={todos} onChange={onChange} />);

    // when
    const removeButton = screen.getByTestId("list-item-remove-3");
    fireEvent.click(removeButton);

    // then
    expect(onChange).toHaveBeenCalledWith([
      { key: "1", value: "Lorem Ipusm" },
      { key: "2", value: "Dolor Sit" },
    ]);
  });

  it("완료 버튼 클릭 시 해당 항목의 isComplete 값이 true로 변경돼야 한다.", () => {
    // given
    const todos = [
      { key: "1", value: "Lorem Ipusm" },
      { key: "2", value: "Dolor Sit" },
      { key: "3", value: "Amet" },
    ];
    const onChange = jest.fn();
    render(<List todos={todos} onChange={onChange} />);

    // when
    const completeButton = screen.getByTestId("list-item-complete-2");
    fireEvent.click(completeButton);

    // then
    expect(onChange).toHaveBeenCalledWith([
      { key: "1", value: "Lorem Ipusm" },
      { key: "2", value: "Dolor Sit", isComplete: true },
      { key: "3", value: "Amet" },
    ]);
  });
});
