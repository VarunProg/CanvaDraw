import { store } from "../store/store";

import {
  updateAction,
  updateTotalItems,
  selectedColor,
} from "../store/globalSlice";

describe("Redux Action Tests", () => {
  test("update action in state", () => {
    let prevActionState = store.getState().global.action;
    expect(prevActionState).toBeNull();

    store.dispatch(updateAction("test action"));
    let newActionState = store.getState().global.action;
    expect(newActionState).toEqual("test action");
  });

  test("update boxColor in state", () => {
    let prevBoxColorState = store.getState().global.fillColor;
    expect(prevBoxColorState).toBe("red");

    store.dispatch(selectedColor("test boxColor"));
    let newBoxColorState = store.getState().global.fillColor;
    expect(newBoxColorState).toBe("test boxColor");
  });

  test("update total no of items in state", () => {
    let prevItemsState = store.getState().global.totalItems;
    expect(prevItemsState).toBe(0);

    store.dispatch(updateTotalItems("test items"));
    let newItemsState = store.getState().global.totalItems;
    expect(newItemsState).toBe("test items");
  });
});
