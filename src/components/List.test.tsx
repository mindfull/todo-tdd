import { fireEvent, render, screen } from "@testing-library/react";
import type { Todo } from "../App";
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

  it("항목이 비어있는 경우 목록이 비어있다는 메시지를 출력해야 한다.", () => {
    // given
    const todos: Todo[] = [];
    const onChange = jest.fn();

    // when
    render(<List todos={todos} onChange={onChange} />);

    // then
    expect(
      screen.getByText("목록이 비어있습니다. 여유를 즐기세요!"),
    ).toBeInTheDocument();
  });

  it("모든 항목이 완료된 경우 목록이 비어있다는 메시지를 출력해야 한다.", () => {
    // given
    const todos: Todo[] = [
      {
        key: "1",
        value: "Lorem Ipusm",
        isComplete: true,
      },
    ];
    const onChange = jest.fn();

    // when
    render(<List todos={todos} onChange={onChange} />);

    // then
    expect(
      screen.getByText("목록이 비어있습니다. 여유를 즐기세요!"),
    ).toBeInTheDocument();
  });

  it("완료된 항목 보기 체크가 켜진 경우 완료된 항목도 출력해야 한다.", () => {
    // given
    const todos = [
      { key: "1", value: "Lorem Ipusm" },
      { key: "2", value: "Dolor Sit", isComplete: true },
      { key: "3", value: "Amet" },
    ];
    const onChange = jest.fn();
    render(<List todos={todos} onChange={onChange} />);
    const showCompleteCheckbox = screen.getByTestId("list-show-complete");

    // when
    fireEvent.click(showCompleteCheckbox);

    // then
    const result = screen.getByTestId("list");
    expect(result).toHaveTextContent("Dolor Sit");
  });
});
