import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../store/slices/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
