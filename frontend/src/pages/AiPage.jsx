import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);  
  const [currentQuestion, setCurrentQuestion] = useState(0);  
  const [selectedOption, setSelectedOption] = useState("");  
  const [score, setScore] = useState(0);  
  const [isLoading, setIsLoading] = useState(true);  
  const [isSubmitted, setIsSubmitted] = useState(false);  
  const location = useLocation();
  const { wrongQuestions } = location.state;

  
  useEffect(() => {
    
    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/content/extraquestions', {input_data: wrongQuestions});
            console.log(response);
            setQuestions(response.data.data.questions);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setIsLoading(false);
        }
    };

    fetchQuestions();
}, []); 

  
  const handleOptionClick = (option) => {
    setSelectedOption(option);  
  };

  
  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;  
    if (isCorrect) {
      setScore(score + 1);  
    }

    const nextQuestion = currentQuestion + 1; 
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");  
    } else {
      setIsSubmitted(true);  
    }
  };

  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
  }

  
  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
          <p className="text-lg">You scored {score} out of {questions.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left p-2 rounded border ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!selectedOption}  
          >
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
