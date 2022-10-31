import { configureStore } from "@reduxjs/toolkit";
import _default from "react-redux/es/components/connect";
import globalReducers from "./globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
