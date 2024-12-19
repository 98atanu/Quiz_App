import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuizSetup = ({ onStartQuiz }: any) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStartQuiz({ category, difficulty });
  };

  return (
    <motion.div
      className="p-6 max-w-[600px] h-auto  bg-[#2f5450] rounded-xl shadow-lg shadow-[#2f5450] space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-3xl font-bold text-[#e0f299] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Quiz App
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">
            Category
          </label>
          <motion.select
          whileHover={{ scale: 1.1, backgroundColor: '#cbdd8a' }}
          whileTap={{ scale: 0.9 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border bg-[#e0f299] font-semibold text-sm text-[#2f5450] outline-[#2f5450] rounded-lg p-2"
          >
            <option value="">Any Category</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </motion.select>
        </div>
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">
            Difficulty
          </label>
          <motion.select
          whileHover={{ scale: 1.1, backgroundColor: '#cbdd8a' }}
          whileTap={{ scale: 0.9 }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border bg-[#e0f299] outline-[#2f5450] font-semibold text-sm text-[#2f5450] rounded-lg p-2 mb-4"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </motion.select>
        </div>
        <motion.button
        whileHover={{ scale: 1.1, backgroundColor: '#d6e3a5' }}
        whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-full bg-[#e0f299] text-[#2f5450] text-lg font-bold py-2 rounded-lg"
          
        >
          Start Quiz
        </motion.button>
      </form>
    </motion.div>
  );
};

export default QuizSetup;
