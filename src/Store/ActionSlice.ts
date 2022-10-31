import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const actionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    updateAction: (state, action) => {
      // state.totalItems += 1;
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

// Action creators are generated for each case reducer function
export const { updateAction, updateTotalItems, selectedColor } =
  actionSlice.actions;

export default actionSlice.reducer;
