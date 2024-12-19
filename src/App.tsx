import React, { useState } from 'react';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import { motion } from 'framer-motion';

const App = () => {
  const [quizSettings, setQuizSettings] = useState<{ category: string; difficulty: string } | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleStartQuiz = (settings: { category: string; difficulty: string }) => {
    setQuizSettings(settings);
  };

  const handleQuizEnd = (finalScore: number) => {
    setScore(finalScore);
    setQuizSettings(null); // Reset quiz settings after quiz completion
    console.log("Final Score:", finalScore);
  };

  return (
    <div className="min-h-screen bg-[#e0f299] flex items-center justify-center">
      {!quizSettings && score === null && (
        <QuizSetup onStartQuiz={handleStartQuiz} />
      )}
      {quizSettings && <Quiz settings={quizSettings} onQuizEnd={handleQuizEnd} />}
      {score !== null && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Quiz Completed!</h1>
          <p>Your score: {score}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setScore(null)}
            className="mt-4 bg-[#2f5450] text-[#e0f299] py-2 px-4 rounded-lg"
          >
            Restart
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default App;
