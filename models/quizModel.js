const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswers: [{ type: String }],
    }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;