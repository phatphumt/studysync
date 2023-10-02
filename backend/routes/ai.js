const { Router } = require('express');
const aiFlashcardRouter = require('./ai/aiFlashcards');
const aiRouter = Router();

aiRouter.use('/flashcard', aiFlashcardRouter);

module.exports = { aiRouter };
