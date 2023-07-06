const Quiz = require('../models/quizModel');
const Participant = require('../models/participantModel');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    const { title, questions } = req.body;

    try {
        const quiz = new Quiz({
            title,
            questions,
            creator: req.user.userId,
        });

        await quiz.save();

        res.json({ message: 'Quiz created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the quiz' });
    }
}


// Get all quizzes
exports.getAllQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('creator', 'username');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving quizzes' });
    }
}

// Get a specific quiz by ID
exports.getSpecificQuiz = async (req, res) => {
    const quizId = req.params.id;

    try {
        const quiz = await Quiz.findById(quizId).populate('creator', 'username');
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the quiz' });
    }
}


// Share a quiz with others (participants)
exports.shareQuiz = async (req, res) => {
    const quizId = req.params.id;

    try {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        const participant = new Participant({
            quiz: quizId,
            user: req.user.userId,
        });

        await participant.save();

        res.json({ message: 'Quiz shared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sharing the quiz' });
    }
}

// Submit quiz answers and calculate score for a participant
exports.submitQuizAndScore = async (req, res) => {
    const quizId = req.params.id;
    const { answers } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            const correctAnswers = question.correctAnswers;
            const selectedAnswers = answers[index];

            if (correctAnswers.length === selectedAnswers.length && correctAnswers.every((a) => selectedAnswers.includes(a))) {
                score++;
            }
        })
        const participant = await Participant.findOneAndUpdate(
            { quiz: quizId, user: req.user.userId },
            { score },
            { new: true }
        );

        res.json({ score: participant.score });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting the quiz' });
    }
}

// Get participants and their scores for a quiz
exports.participantAndScore = async (req, res) => {
    const quizId = req.params.id;

    try {
        const participants = await Participant.find({ quiz: quizId }).populate('user', 'username');
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving participants' });
    }
}