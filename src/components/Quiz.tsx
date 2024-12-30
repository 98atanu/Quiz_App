import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz, nextQuestion, incrementScore } from "../store/slices/quizSlice";
import QuestionCard from "./QuestionCard";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSnackbar } from "notistack";


const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score } = useSelector((state: any) => state.quiz);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const {enqueueSnackbar} = useSnackbar();
  
  // Handle answer submission
  const handleAnswer = (isCorrect : boolean) => {
    if (isCorrect) {
      dispatch(incrementScore());
      enqueueSnackbar("Correct Answer!!!",  {variant: "success"} )
    }
    else {
      enqueueSnackbar("Incorrect Answer!!!", {variant : "error"})
    }

    if (currentQuestionIndex + 1 < questions.length) {
      dispatch(nextQuestion());
    } else {
      // End of quiz
      dispatch(nextQuestion());
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    dispatch(resetQuiz());
  };

  // Render the final score with a pie chart
  if (currentQuestionIndex >= questions.length) {
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;

    const pieData = {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ["#26543d", "#e0f299"],
          hoverBackgroundColor: ["#26543d", "#d4ed91"],
        },
      ],
    };

    const pieOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#e0f299",
            font: {
              size: 14, 
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || "";
              const value = context.raw;
              return `${label}: ${value}`;
            },
          },
          backgroundColor: "#26543d", // Tooltip background color
          titleColor: "#e0f299", // Tooltip title color
          bodyColor: "#e0f299", // Tooltip text color
        },
      },
    };

    return (
      <motion.div
        className="p-6 max-w-md mx-auto bg-[#2f5450] rounded-lg shadow-lg space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-[#e0f299] text-center">Quiz Completed!</h1>
        <div className="flex justify-center">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <p className="text-center text-[#e0f299] font-bold text-lg">
          You scored {score} out of {questions.length}.
        </p>
        <button
          onClick={handleRestart}
          className="w-full bg-[#e0f299] text-[#2f5450] font-bold py-2 rounded-lg hover:bg-[#d6e3a5]"
        >
          Restart Quiz
        </button>
      </motion.div>
    );
  }

  // Render the quiz questions
  return (
    <motion.div
      className="p-6 max-w-md mx-auto bg-[#2f5450] rounded-lg shadow-lg space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-xl font-bold text-[#e0f299] text-center">
        Question {currentQuestionIndex + 1}/{questions.length}
      </h1>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      <p className="text-[#e0f299] text-center font-medium">Score: {score}</p>
    </motion.div>
  );
};

export default Quiz;
