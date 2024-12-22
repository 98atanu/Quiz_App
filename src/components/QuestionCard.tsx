import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TriviaQuestion } from "../types";

interface QuestionCardProps {
  question: TriviaQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    );
    setShuffledAnswers(shuffled);
  }, [question]);

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-lg font-bold text-[#e0f299]">{question.question}</h2>
      <div className="space-y-2">
        {shuffledAnswers.map((answer, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05, backgroundColor: "#cbdd8a" }}
            whileTap={{ scale: 0.9 }}
            className="w-full px-4 py-2 text-left text-[#2f5450] bg-[#e0f299] rounded-lg"
            onClick={() => onAnswer(answer === question.correct_answer)}
          >
            {answer}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
