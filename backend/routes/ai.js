const { Router } = require('express');
const aiFlashcardRouter = require('./ai/aiFlashcards');
const aiQuizRouter = require('./ai/aiQuiz');
const aiRouter = Router();

aiRouter.use('/flashcard', aiFlashcardRouter);
aiRouter.use('/quiz', aiQuizRouter);

module.exports = { aiRouter };
