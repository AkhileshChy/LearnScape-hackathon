import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true
        },
        questions: [
            {
                question_id: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                },
                difficulty: {
                    type: String,
                    required: true
                },
                question: {
                    type: String,
                    required: true
                },
                options: [
                    {
                        type: String,
                        required: true
                    }
                ],
                answer: {
                    type: String,
                    required: true
                },
                explanation: {
                    type: String,
                    required: true
                }
            }
        ]
    }
)

const Question = mongoose.model("Question", questionSchema);

export default Question;