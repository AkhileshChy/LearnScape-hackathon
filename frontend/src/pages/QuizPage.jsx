import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
    const location = useLocation();
    const { title } = location.state;
    const [topic, setTopic] = useState(title);
    const [questions, setQuestions] = useState([]);  
    const [currentQuestion, setCurrentQuestion] = useState(0);  
    const [selectedOption, setSelectedOption] = useState("");  
    const [score, setScore] = useState(0);  
    const [isLoading, setIsLoading] = useState(true);  
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:5000/api/v1/content/questions', { topic });
                console.log(response);
                setQuestions(response.data.questions);
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
        else{
            const temp = wrongQuestions;
            temp.push(questions[currentQuestion].question);
            setWrongQuestions(temp);
        }

        const nextQuestion = currentQuestion + 1;  
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption("");  
        } else {
            setIsSubmitted(true);  
        }
    };

    const handlePracticeMore = () => {
        navigate('/aiquiz', { state : {wrongQuestions: wrongQuestions} });
    }
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
    }

    
    if (isSubmitted) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
                    <p className="text-lg">You scored {score} out of {questions.length}</p>
                    <button
                        onClick={handlePracticeMore}
                        className="w-full bg-blue-500 text-white py-2 px-4 my-2 rounded-lg hover:bg-blue-600"
                    >
                        practice more 
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
                <div className="space-y-2">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`block w-full text-left p-2 rounded border ${selectedOption === option ? 'bg-green-400 text-white' : 'bg-gray-200'}`}
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
