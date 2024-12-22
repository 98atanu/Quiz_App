import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTriviaCategories, fetchTriviaQuestions } from "../api/quizApi";
import { setSettings, setQuestions, setLoading, setError } from "../store/slices/quizSlice";
import { motion } from "framer-motion";

const QuizSetup = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => state.quiz);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  // Fetch trivia categories when the component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchTriviaCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        dispatch(setError("Failed to load categories. Please try again later."));
      }
    };

    loadCategories();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      dispatch(setSettings({ category, difficulty }));

      const questions = await fetchTriviaQuestions(10, difficulty, parseInt(category));
      dispatch(setQuestions(questions));
    } catch (err) {
      console.error("Error fetching questions:", err);
      dispatch(setError("Failed to fetch questions. Please try again later."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <motion.div
      className="p-6 max-w-md mx-auto bg-[#2f5450] rounded-lg shadow-lg shadow-[#244642] space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl text-[#e0f299] font-bold  text-center">Quiz App</h1>
      {error && (
        <p className="text-red-500 text-center" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border bg-[#e0f299] text-[#2f5450] rounded-lg p-2 font-medium"
          >
            <option value="">Any Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border bg-[#e0f299] text-[#2f5450] rounded-lg p-2 font-medium mb-3"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#e0f299] text-[#2f5450] text-lg font-bold py-2 rounded-lg hover:bg-[#d6e3a5] "
        >
          Start Quiz
        </button>
      </form>
    </motion.div>
  );
};

export default QuizSetup;
