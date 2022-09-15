import type { Todo } from "../App";
import { LOCAL_STORAGE_KEY } from "../constants";

export const fetchList = () => {
  const data = globalThis.localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    // 로컬스토리지에 데이터 없음
    if (!data) {
      return [];
    }

    // 배열이 아님
    const parsedData = (JSON.parse(data).data as unknown[]) ?? [];
    if (!Array.isArray(parsedData)) {
      return [];
    }

    // key와 value가 없는 데이터는 삭제
    const todos = parsedData.filter<Todo>((datum: unknown): datum is Todo => {
      if (!datum || typeof datum !== "object") {
        return false;
      }

      if (!("key" in datum && "value" in datum)) {
        return false;
      }

      const datumAsTodoCandidate = datum as Todo;
      return !!(datumAsTodoCandidate.key && datumAsTodoCandidate.value);
    });
    return todos;
  } catch {
    return [];
  }
};
