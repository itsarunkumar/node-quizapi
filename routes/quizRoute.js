const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizControllers');

// Create a new quiz
router.post('/', quizController.createQuiz);

// Get all quizzes
router.get('/', quizController.getAllQuiz);

// Get a specific quiz by ID
router.get('/:id', quizController.getSpecificQuiz);

// Share a quiz with others (participants)
router.post('/:id/share', quizController.shareQuiz);

// Submit quiz answers and calculate score for a participant
router.post('/:id/submit', quizController.submitQuizAndScore);

// Get participants and their scores for a quiz
router.get('/:id/participants', quizController.participantAndScore);

module.exports = router;
