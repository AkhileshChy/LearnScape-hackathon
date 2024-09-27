import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title }) => {
    const navigate = useNavigate();
    const handleChange = () => {
        navigate('/quiz', { state: { title: title } });
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-gray-900"
            style={{

                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', 
                height: '30vh',
            }}
        >
            <div
                onClick={handleChange}
                className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center">
                    This is a brief description about {title}. You can explore more details here.
                </p>
            </div>
        </div>
    );
};

const TopicPage = () => {
    const courses = ["DSA", "Web Development", "Blockchain", "AI/ML"];

    const handleChatbot = () => {
        window.location.href = 'https://chatbot-lms.streamlit.app/';
    };

    const handleSocratic = () => {
        window.location.href = 'https://socratic.streamlit.app/';
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <div className="mb-6 text-center">
                <h1 className="text-7xl font-bold text-orange-400 my-10">LearnQuest</h1>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-white">Explore Our Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl p-4 ">
                {courses.map((course) => (
                    <Card key={course} title={course} />
                ))}
            </div>
            <button
                className="w-1/4 bg-blue-500 text-white py-2 px-4 my-2 rounded-lg hover:bg-blue-600"
                onClick={handleChatbot}
            >
                ChatBot
            </button>
            <button
                className="w-1/4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleSocratic}
            >
                Socratic
            </button>
        </div>
    );
};

export default TopicPage;
