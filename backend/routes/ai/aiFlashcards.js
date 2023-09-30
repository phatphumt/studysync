const { openai } = require('../ai');
const aiFlashcardRouter = require('express').Router();

aiFlashcardRouter.get('/', (req, res) => {
	res.send('testing');
});

module.exports = aiFlashcardRouter;
