import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  totalItems: number;
  action: null;
  fillColor: string;
}

const initialState: IInitialState = {
  totalItems: 0,
  action: null,
  fillColor: "red",
};

export const globalSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    updateAction: (state, action) => {
      state.action = action.payload;
    },
    updateTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    selectedColor: (state, action) => {
      state.fillColor = action.payload;
    },
  },
});

export const { updateAction, updateTotalItems, selectedColor } =
  globalSlice.actions;

export default globalSlice.reducer;
