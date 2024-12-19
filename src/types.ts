export interface Category {
    id: number;
    name: string;
  }
  
  export interface Question {
    question: string;
    answers: { text: string; isCorrect: boolean }[];
  }
  