import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("App", () => {
  it("페이지 제목으로 'Todo List'가 출력되어야 한다.", () => {
    // given
    render(<App />);

    // when
    // then
    const title = screen.getByTestId("header-title");
    expect(title).toHaveTextContent("Todo List");
  });

  it("새로운 todo를 추가할 수 있어야 한다.", () => {
    // given
    render(<App />);

    // when
    const input = screen.getByTestId("add-input");
    fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    // then
    const result = screen.getByTestId("list");
    expect(result).toHaveTextContent("Lorem Ipsum");
  });

  it("이미 todo가 존재하는 상태에서 다음 todo를 입력하는 경우 todo 목록에 새 todo가 추가돼야 한다.", () => {
    // given
    render(<App />);
    const input = screen.getByTestId("add-input");
    fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    // when
    fireEvent.change(input, { target: { value: "Dolor Sit" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    // then
    const result = screen.getByTestId("list");
    expect(result).toHaveTextContent("Lorem Ipsum");
    expect(result).toHaveTextContent("Dolor Sit");
  });
});
