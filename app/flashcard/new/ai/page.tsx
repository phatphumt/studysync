import OpenAI from "openai";

const FlashcardAIGen = () => {
  async function addToDB(formData: FormData) {
    "use server";
    console.log("adding");
    const choices = formData.get("choices");
    const topic = formData.get("topic");
    console.log(topic, choices);
    const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    try {
      const data = await ai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `you are a flashcard generator. you will get the amount of flashcard that you will generate and the topic amount that question. return to user with the following json document format without deviation. \n
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
            `,
          },
          {
            role: "user",
            content: `Topic: ${topic}\nAmount of flashcard: ${choices}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      console.log(data.choices[0].message.content as string);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  return (
    <div className="p-5">
      <form action={addToDB}>
        <input
          type="text"
          name="topic"
          placeholder="topic"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        <input
          type="text"
          name="choices"
          placeholder="choices"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        <br />
        <br />
        <button type="submit" className="btn">
          get the fucking data
        </button>
      </form>
    </div>
  );
};

export default FlashcardAIGen;
