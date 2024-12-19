import axios from "axios";

export interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export const fetchTriviaCategories = async (): Promise<TriviaCategory[]> => {
  const response = await axios.get<{ trivia_categories: TriviaCategory[] }>(
    "https://opentdb.com/api_category.php"
  );
  return response.data.trivia_categories;
};

export const fetchTriviaQuestions = async (
  amount: number = 10,
  difficulty: string = "easy",
  categoryId?: number
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple &category=${categoryId}`
  const response = await axios.get<{ results: TriviaQuestion[] }>(url);
  return response.data.results;
};
