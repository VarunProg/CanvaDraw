import { configureStore } from "@reduxjs/toolkit";
import actions from "./ActionSlice";

export const store = configureStore({
  reducer: {
    action: actions,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
