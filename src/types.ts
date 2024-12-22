export interface TriviaQuestion {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface QuizSettings {
  category: string;
  difficulty: string;
}
