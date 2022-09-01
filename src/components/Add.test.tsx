import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Add from "./Add";

// testid 네이밍 룰: 분류(추가하기: add, 목록: list)-상세(input, button_0, item, ...)

describe("추가하기", () => {
  it("페이지에 접속하면 화면에 입력창이 있어야 한다.", () => {
    // given
    render(<Add />);

    // when
    // then
    const input = screen.getByTestId("add-input");
    expect(input).toBeInTheDocument();
  });

  it("입력창이 비어있는 경우 안내 메시지가 placeholder로 출력돼야 한다.", () => {
    // given
    render(<Add />);

    // when
    // then
    const input = screen.getByTestId("add-input");
    expect(input).toHaveAttribute("placeholder", "할 일을 입력하세요.");
  });

  describe("입력된 상태에서 엔터를 입력한 경우", () => {
    it("입력된 값을 함수에 넘겨줘야 한다.", () => {
      // given
      const onAdd = jest.fn();
      render(<Add onAdd={onAdd} />);
      const input = screen.getByTestId("add-input");

      // when
      fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

      // then
      expect(onAdd).toBeCalledWith("Lorem Ipsum");
    });

    it("입력된 값을 비워야 한다.", () => {
      // given
      render(<Add />);
      const input = screen.getByTestId("add-input");

      // when
      fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

      // then
      expect(input).toHaveValue("");
    });

    it("오류 상태를 보여주지 않아야 한다.", () => {
      // given
      render(<Add />);
      const input = screen.getByTestId("add-input");
      const inputWrapper = screen.getByTestId("add-wrapper");

      // when
      fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

      // then
      expect(inputWrapper).not.toHaveClass("Add-error");
    });
  });

  describe("입력된 상태에서 버튼을 클릭한 경우", () => {
    it("입력된 값을 함수에 넘겨줘야 한다.", () => {
      // given
      const onAdd = jest.fn();
      render(<Add onAdd={onAdd} />);
      const input = screen.getByTestId("add-input");
      const addButton = screen.getByTestId("add-button");

      // when
      fireEvent.change(input, { target: { value: "Dolor Sit" } });
      fireEvent.click(addButton);

      // then
      expect(onAdd).toBeCalledWith("Dolor Sit");
    });

    it("입력된 값을 비워야 한다.", () => {
      // given
      render(<Add />);
      const input = screen.getByTestId("add-input");
      const addButton = screen.getByTestId("add-button");

      // when
      fireEvent.change(input, { target: { value: "Dolor Sit" } });
      fireEvent.click(addButton);

      // then
      expect(input).toHaveValue("");
    });

    it("오류 상태를 보여주지 않아야 한다.", () => {
      // given
      render(<Add />);
      const input = screen.getByTestId("add-input");
      const addButton = screen.getByTestId("add-button");
      const inputWrapper = screen.getByTestId("add-wrapper");

      // when
      fireEvent.change(input, { target: { value: "Dolor Sit" } });
      fireEvent.click(addButton);

      // then
      expect(inputWrapper).not.toHaveClass("Add-error");
    });

    it("입력창에 포커스가 돌아가야 한다.", () => {
      // given
      render(<Add />);
      const input = screen.getByTestId("add-input");
      const addButton = screen.getByTestId("add-button");

      // when
      fireEvent.change(input, { target: { value: "Dolor Sit" } });
      fireEvent.click(addButton);

      // then
      expect(input).toHaveFocus();
    });
  });

  it("입력되지 않은 상태에서 엔터를 입력한 경우, 오류 상태를 보여줘야 한다.", () => {
    // given
    render(<Add />);
    const input = screen.getByTestId("add-input");
    const inputWrapper = screen.getByTestId("add-wrapper");

    // when
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    // then
    expect(inputWrapper).toHaveClass("Add-error");
  });

  it("입력되지 않은 상태에서 버튼을 클릭한 경우, 오류 상태를 보여줘야 한다.", () => {
    // given
    render(<Add />);
    const inputWrapper = screen.getByTestId("add-wrapper");
    const addButton = screen.getByTestId("add-button");

    // when
    fireEvent.click(addButton);

    // then
    expect(inputWrapper).toHaveClass("Add-error");
  });

  it("오류 상태에서 값을 입력한 경우 오류 상태를 보여주지 않아야 한다.", () => {
    // given
    render(<Add />);
    const input = screen.getByTestId("add-input");
    const inputWrapper = screen.getByTestId("add-wrapper");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    // when
    fireEvent.change(input, { target: { value: "Dolor Sit" } });

    // then
    expect(inputWrapper).not.toHaveClass("Add-error");
  });
});
