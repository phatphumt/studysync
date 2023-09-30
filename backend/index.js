const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const flashcardRouter = require('./routes/flashcards');
const { config } = require('dotenv');
const { OpenAI } = require('openai');
const { router } = require('./routes/ai');

config();
const app = express();
const openAI = new OpenAI();

db = connect(process.env.DBURI)
	.then(() => {
		console.log('db connected');
		app.listen(4000, () =>
			console.log('server running at: http://localhost:4000')
		);
	})
	.catch((e) => {
		console.log(e);
	});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/flashcard', flashcardRouter);
app.use('/ai', router);
