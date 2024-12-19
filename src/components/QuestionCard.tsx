import React, { useEffect, useState } from "react";
import { TriviaQuestion } from "../api/quizApi";


interface QuestionProps {
  question: TriviaQuestion;
  onAnswer: (isCorrect: any) => void;
}

const QuestionCard: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [question]);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#e0f299] mb-4">{question.question}</h2>
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="w-full px-4 py-2 text-left text-[#2f5450] bg-[#e0f299] hover:bg-[#cbdd8a] rounded "
            onClick={() => onAnswer(answer === question.correct_answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
