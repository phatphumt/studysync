const { aiPrompt, quizPrompt } = require('./prompts');

const aiQuizRouter = require('express').Router();
const sendError = (res, e) => res.status(500).send({ error: `${e}` });

/* aiQuizRouter.get('/test', async (_, res) => {
	const a = await aiPrompt(quizPrompt('10', '4', 'algebra'));
	res.send(a);
}); */

aiQuizRouter.get('/', async (req, res) => {
	const { items, choices, topic } = req.body;

	if (!items) {
		sendError(res, 'items, choices or topic must not be empty');
		return;
	}

	if (!choices) {
		sendError(res, 'items, choices or topic must not be empty');
		return;
	}
	if (!topic) {
		sendError(res, 'items, choices or topic must not be empty');
		return;
	}

	// console.log(quizPrompt(items, choices, topic), items, choices, topic);
	const a = await aiPrompt(quizPrompt(items, choices, topic));
	res.send(a);
});

module.exports = aiQuizRouter;
