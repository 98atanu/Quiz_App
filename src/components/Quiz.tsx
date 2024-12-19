import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import { DNA } from 'react-loader-spinner';

const Quiz = ({ settings, onQuizEnd }: any) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const { category, difficulty } = settings;
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q: any) => ({
          ...q,
          answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formattedQuestions);
      });
  }, [settings]);

  const shuffleArray = (array: any) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onQuizEnd(score + 1);
    }
  };

  if (!questions.length) return (
    <DNA
  visible={true}
  height="100"
  width="100"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-[#2f5450] rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl text-[#e0f299] font-bold underline">Choose the correct answer:</h1>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;
