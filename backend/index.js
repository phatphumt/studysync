const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const flashcardRouter = require('./routes/flashcards');
const { config } = require('dotenv');
const { aiRouter } = require('./routes/ai');

config();
const app = express();

connect(process.env.DBURI)
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
app.use('/ai', aiRouter);
