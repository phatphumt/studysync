const { OpenAI } = require('openai');
const aiRouter = require('express').Router();
require('dotenv').config();
const aiFlashcardRouter = require('./ai/aiFlashcards');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
aiRouter.use('/flashcard', aiFlashcardRouter);

module.exports = { aiRouter, openai };
