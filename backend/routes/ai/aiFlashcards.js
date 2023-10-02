const express = require('express');
const { OpenAI } = require('openai');
const { config } = require('dotenv');

config();
const aiFlashcardRouter = express.Router();
const ai = new OpenAI();

aiFlashcardRouter.get('/test', (_, res) => {
	console.log(process.env.OPENAI_API_KEY);
	ai.chat.completions
		.create({
			messages: [
				{
					role: 'user',
					content:
						'generate json document for 10 flashcards about thailand without formatting',
				},
			],
			model: 'gpt-3.5-turbo',
		})
		.then((r) => {
			res.send(r.choices[0].message.content);
			const a = JSON.parse(r.choices[0].message.content);
			console.log(a);
		})
		.catch((e) => {
			res.send(e);
		});
});

aiFlashcardRouter.post('/', (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

module.exports = aiFlashcardRouter;
