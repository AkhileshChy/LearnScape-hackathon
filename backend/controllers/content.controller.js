import Question from "../models/question.model.js";
import axios from "axios";

export const createQuestion = async (req, res) => {
    try {
        const { topic, questions } = req.body;
        let newQuestion = new Question({
            topic,
            questions
        });
        await newQuestion.save();
        res.status(201).json(newQuestion);    
    } catch (error) {
        console.error("Error in createPost controller:", error);
    }
}

export const getQuestionByTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        const data = await Question.findOne({ topic });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error in getQuestionById controller: ', error.message);
    }
}

export const getResults = async (req, res) => {
    try {
        const { topic, answer } = req.body;
        const data = await Question.find(topic);
        const questions = data.questions;
        const results = [];
        for (let i = 0; i < questions.length; i++){
            if (questions[i].answer === answer[i].answer){
                results.push({ ...questions[i], success: true});
            }
            else {
                results.push({ ...questions[i], success: false});
            }
        } 
        res.status(200).json(results);
    } catch (error) {
        console.error('Error in getResults controller: ', error.message);
    }
}

export const getExtraQuestions = async (req, res) => {
    try {
        const { input_data } = req.body;
        const response = await axios.post('http://127.0.0.1:8000/generate/', {input_data});
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in getExtraQuestions controller: ', error.message);
    }
}

