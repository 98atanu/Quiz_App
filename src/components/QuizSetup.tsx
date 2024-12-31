import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTriviaCategories, fetchTriviaQuestions } from "../api/quizApi";
import { setSettings, setQuestions, setLoading, setError } from "../store/slices/quizSlice";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

const QuizSetup = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.quiz);
  const { enqueueSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data: any = await fetchTriviaCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        enqueueSnackbar("Failed to load categories!", { variant: "error" });
      }
    };

    loadCategories();
  }, [dispatch, enqueueSnackbar]);

  const formik = useFormik({
    initialValues: {
      category: "",
      difficulty: "easy",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Please select a category."),
    }),
    onSubmit: async (values) => {
      dispatch(setError(null));
      dispatch(setLoading(true));

      try {
        dispatch(setSettings(values));
        const questions = await fetchTriviaQuestions(10, values.difficulty, parseInt(values.category));
        if (!questions.length) {
          throw new Error("No questions available for the selected category and difficulty.");
        }
        dispatch(setQuestions(questions));
        enqueueSnackbar("Quiz loaded successfully!", { variant: "success" });
      } catch (err) {
        console.error("Error fetching questions:", err);
        enqueueSnackbar("Failed to fetch questions. Please try again.", { variant: "error" });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <motion.div
      className="p-6 w-96 mx-auto bg-[#2f5450] rounded-lg shadow-lg shadow-[#244642] space-y-4"
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
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">Category</label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border bg-[#e0f299] text-[#2f5450] rounded-lg p-2 font-medium"
          >
            <option value="">Select a Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-[#e0f299] text-lg font-semibold">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formik.values.difficulty}
            onChange={formik.handleChange}
            className="w-full border bg-[#e0f299] text-[#2f5450] rounded-lg p-2 font-medium mb-5"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-[#e0f299] text-[#2f5450] text-lg font-bold py-2 rounded-lg hover:bg-[#d6e3a5] ${
            formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Start Quiz"}
        </button>
      </form>
    </motion.div>
  );
};

export default QuizSetup;
