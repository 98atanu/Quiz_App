import axios from "axios";
import { TriviaCategory, TriviaQuestion } from "../types";

export const fetchTriviaCategories = async (): Promise<TriviaCategory[]> => {
  const response = await axios.get<{ trivia_categories: TriviaCategory[] }>(
    "https://opentdb.com/api_category.php"
  );
  return response.data.trivia_categories;
};

export const fetchTriviaQuestions = async (
  amount: number,
  difficulty: string,
  category: number
): Promise<TriviaQuestion[]> => {
  const response = await axios.get<{ results: TriviaQuestion[] }>(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`
  );
  return response.data.results;
};
