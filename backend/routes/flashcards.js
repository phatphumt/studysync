const flashcardRouter = require('express').Router();
const { FlashcardSchema } = require('../models/schemas');

const sendError = (res, e) => res.status(500).send({ error: `${e}` });

flashcardRouter.get('/', (_, res) => {
	FlashcardSchema.find()
		.then((r) => res.send(r))
		.catch((e) => sendError(res, e));
});

flashcardRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	FlashcardSchema.findById(id)
		.then((r) => res.send(r))
		.catch((e) => sendError(res, e));
});

flashcardRouter.post('/', (req, res) => {
	if (Object.keys(req.body).length !== 0) {
		const data = new FlashcardSchema(req.body);
		data
			.save()
			.then((r) => res.send(r))
			.catch((e) => sendError(res, e));
	} else {
		sendError(res, 'the request body is empty');
	}
});

flashcardRouter.put('/:id', (req, res) => {
	if (Object.keys(req.body).length !== 0) {
		const { id } = req.params;
		FlashcardSchema.findByIdAndUpdate(id, req.body)
			.then((r) => res.send(r))
			.catch((e) => sendError(res, e));
	} else {
		sendError(res, 'the request body is empty');
	}
});

flashcardRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	FlashcardSchema.findByIdAndDelete(id)
		.then((r) => res.send(r))
		.catch((e) => sendError(res, e));
});

flashcardRouter.delete('/delete-all', (req, res) => {
	FlashcardSchema.delete()
		.then(() => res.send('deleted all document'))
		.catch((e) => sendError(res, e));
});

module.exports = flashcardRouter;
