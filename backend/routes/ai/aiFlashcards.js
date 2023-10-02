const express = require('express');
const { config } = require('dotenv');
const { flashcardPrompt, aiPrompt } = require('./prompts');

config();
const aiFlashcardRouter = express.Router();

aiFlashcardRouter.get('/test', async (_, res) => {
	console.log(process.env.OPENAI_API_KEY);
	const a = await aiPrompt(flashcardPrompt('10', 'movement and force'));
	res.send(a);
});

module.exports = aiFlashcardRouter;
