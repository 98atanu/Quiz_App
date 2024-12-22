import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizSettings, TriviaQuestion } from "../../types";


interface QuizState {
  settings: QuizSettings | null;
  questions: TriviaQuestion[];
  currentQuestionIndex: number;
  score: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  settings: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  isLoading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<QuizSettings>) {
      state.settings = action.payload;
    },
    setQuestions(state, action: PayloadAction<TriviaQuestion[]>) {
      state.questions = action.payload;
      state.error = null;
    },
    incrementScore(state) {
      state.score += 1;
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    resetQuiz(state) {
      state.settings = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setSettings,
  setQuestions,
  incrementScore,
  nextQuestion,
  resetQuiz,
  setLoading,
  setError,
} = quizSlice.actions;

export default quizSlice.reducer;
