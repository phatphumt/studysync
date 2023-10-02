const { config } = require('dotenv');
const { OpenAI } = require('openai');

const flashcardPrompt = (
	choices,
	topic
) => `generate json document for ${choices}flashcard(s) about ${topic} without formatting following this format without deviation. \n
			{
				"1": {
					"question": "The question",
					"answer": "The answer"
				},
				"2": {
					"question": "The question",
					"answer": "The answer"
				},
				...the rest of the flashcards
			}
		`;
/////////
config();
const ai = new OpenAI();
const aiPrompt = async (prompt) => {
	try {
		const data = await ai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
			model: 'gpt-3.5-turbo',
		});

		return data.choices[0].message.content;
	} catch (e) {
		return e;
	}
};

module.exports = { flashcardPrompt, aiPrompt };
