import React from "react";
import { useSelector } from "react-redux";
import QuizSetup from "./components/QuizSetup";
import Quiz from "./components/Quiz";
import { DNA } from "react-loader-spinner";


const App = () => {
  const { settings, questions } = useSelector((state: any) => state.quiz);

  return (
    <div className="min-h-screen bg-[#e0f299] flex items-center justify-center p-4">
      {/* Conditionally render QuizSetup or Quiz based on settings */}
      {!settings ? (
        <QuizSetup />
      ) : questions.length ? (
        <Quiz />
      ) : (
         <DNA visible={true} height="100" width="100" ariaLabel="dna-loading" />
      )}
    </div>
  );
};

export default App;
