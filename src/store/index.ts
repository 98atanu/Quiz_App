import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../store/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
});

export default store

