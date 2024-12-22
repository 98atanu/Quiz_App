import React from "react";
import QuizSetup from "./components/QuizSetup";



const App = () => {
  // const { settings, questions } = useSelector((state: any) => state.quiz);

  return (
    <div className="min-h-screen bg-[#e0f299] flex items-center justify-center p-4">
        <QuizSetup />
    </div>
  );
};

export default App;
