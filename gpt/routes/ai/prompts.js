const { config } = require("dotenv");
const { OpenAI } = require("openai");

const flashcardPrompt = (
  choices,
  topic
) => `generate json document for ${choices}flashcard(s) about ${topic} without formatting following this format without deviation. \n
		  [
				{
					"question": "The question",
					"answer": "The answer"
				},
				{
					"question": "The question",
					"answer": "The answer"
				},
				...the rest of the flashcards
			]
		`;

const quizPrompt = (
  items,
  numberOfChoices,
  topic
) => `generate json document for quiz with ${items} question(s) with ${numberOfChoices} choices for each question about ${topic} without formatting following this format without deviation.
			[
				{
					"question": "The question (item #1)",
					"choices": [{choice: 'choice 1', correct: true}, {choice: 'choice 2', correct: false}, ...rest of the choices]
				},
				{
					"question": "The question (item #2)",
					"choices": [{choice: 'choice 1', correct: true}, {choice: 'choice 2', correct: false}, ...rest of the choices]
				}
				...rest of the questions
			]
`;

/////////
config();
const ai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });
const aiPrompt = async (prompt) => {
  try {
    const data = await ai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return data.choices[0].message.content;
  } catch (e) {
    return e;
  }
};

module.exports = { flashcardPrompt, aiPrompt, quizPrompt };
