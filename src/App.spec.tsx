import * as uuid from "uuid";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { LOCAL_STORAGE_KEY } from "./constants";

jest.mock("uuid");

describe("App", () => {
  it("페이지 제목으로 'Todo List'가 출력되어야 한다.", () => {
    // given
    render(<App />);

    // when
    // then
    const title = screen.getByTestId("header-title");
    expect(title).toHaveTextContent("Todo List");
  });

  describe("추가", () => {
    let uuidSpy: jest.SpyInstance;

    beforeEach(() => {
      uuidSpy = jest
        .spyOn(uuid, "v4")
        .mockReturnValueOnce("asdf")
        .mockReturnValueOnce("qwer");
    });

    afterEach(() => {
      globalThis.localStorage.clear();
      uuidSpy.mockClear();
    });

    it("새로운 todo를 추가하고 로컬 스토리지에 저장할 수 있어야 한다.", () => {
      // given
      render(<App />);

      // when
      const input = screen.getByTestId("add-input");
      fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

      // then
      const result = screen.getByTestId("list");
      expect(result).toHaveTextContent("Lorem Ipsum");
      expect(globalThis.localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
        JSON.stringify({
          data: [{ key: "asdf", value: "Lorem Ipsum" }],
        }),
      );
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
      expect(globalThis.localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
        JSON.stringify({
          data: [
            { key: "asdf", value: "Lorem Ipsum" },
            { key: "qwer", value: "Dolor Sit" },
          ],
        }),
      );
    });
  });

  describe("목록", () => {
    afterEach(() => {
      globalThis.localStorage.clear();
    });

    it("페이지 접속시 기존에 추가된 완료되지 않은 todo 목록이 노출돼야 한다.", () => {
      // given
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          data: [
            { key: "1", value: "Lorem Ipsum" },
            { key: "2", value: "Dolor Sit", isComplete: true },
            { key: "3", value: "Amet" },
          ],
        }),
      );

      // when
      render(<App />);

      // then
      const result = screen.getByTestId("list");
      expect(result).toHaveTextContent("Lorem Ipsum");
      expect(result).not.toHaveTextContent("Dolor Sit");
      expect(result).toHaveTextContent("Amet");
    });

    it("페이지 접속시 파싱할 수 없는 데이터가 저장소에 저장된 경우 빈 todo 목록이 노출돼야 한다.", () => {
      // given
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        "이것도 해석해보시지!",
      );

      // when
      render(<App />);

      // then
      const result = screen.getByTestId("list");
      expect(result).toBeInTheDocument();
    });

    it("페이지 접속시 key나 value가 없는 데이터가 저장소에 저장된 경우 todo 목록에 추가되면 안 된다.", () => {
      // given
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          data: [
            { key: "1", value: "Lorem" },
            { value: "Ipsum" },
            { key: "3", value: "Dolor" },
            { key: "4" },
          ],
        }),
      );

      // when
      render(<App />);

      // then
      const result = screen.getByTestId("list");
      expect(result).toHaveTextContent("Lorem");
      expect(result).not.toHaveTextContent("Ipsum");
      expect(result).toHaveTextContent("Dolor");

      const items = screen.getAllByTestId("list-item");
      expect(items).toHaveLength(2);
    });

    it("삭제 버튼 클릭시 해당 todo가 목록에서 삭제돼야 한다.", () => {
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          data: [
            { key: "1", value: "Lorem Ipsum" },
            { key: "2", value: "Dolor Sit", isComplete: true },
            { key: "3", value: "Amet" },
          ],
        }),
      );
      render(<App />);

      // when
      const removeButton = screen.getByTestId("list-item-remove-3");
      fireEvent.click(removeButton);

      // then
      const result = screen.getByTestId("list");
      expect(result).not.toHaveTextContent("Amet");
    });
  });
});
