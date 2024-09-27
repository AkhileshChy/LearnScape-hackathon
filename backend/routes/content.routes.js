import express from  "express";
import { createQuestion, getExtraQuestions, getQuestionByTopic, getResults } from "../controllers/content.controller.js";

const router = express.Router();
router.post("/create", createQuestion)
router.post("/questions", getQuestionByTopic);
router.post("/results", getResults);
router.post("/extraQuestions", getExtraQuestions);

export default router;