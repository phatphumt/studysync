"use server";
import { connect } from "mongoose";
import OpenAI from "openai";
import QuizSchema from "../models/QuizSchema";
import { uid } from "uid";
import QuizSessionSchema from "../models/QuizSessionSchema";

export type Quiz = {
  name: string;
  owner: string;
  quizes: Quizes[];
};

export type DBQuiz = Quiz & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Choice = { choice: string; correct: boolean; id: string };

export type Quizes = {
  id: string;
  question: string;
  choices: Choice[];
};

export type QuizSession = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  quizes: Quizes[];
  id: string;
};

export async function generateQuiz(formData: FormData) {
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
          content: `you are a quiz generator. you will get the amount of quiz that you will generate, amount of choices and the topic of that question. return to user with the following json document format without deviation. \n
          [
            {
              "question": "The question (item #1)",
              "choices": 
              [
                {choice: 'choice 1', correct: (true or false)}, 
                {choice: 'choice 2', correct: (true or false)},
                {choice: 'choice 3', correct: (true or false)},
                {choice: 'choice 4', correct: (true or false)}
              ]
            },
            ...rest of the questions
          ]
          make sure that only 1 correct answer should be a question
          `,
        },
        {
          role: "user",
          content: `Topic: ${topic}\nAmount of Quiz: ${choices}\nAmount of choices: 4`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return data.choices[0].message.content as string;
  } catch (e) {
    return `${e}`;
  }
}

export async function addToDB({ name, owner, quizes }: Quiz) {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`);
  }
  try {
    const aaaa = quizes.map((e) => ({ ...e, id: uid() }));
    const dataa: Quiz = {
      name,
      owner,
      quizes: aaaa,
    };
    const a = new QuizSchema(dataa);
    await a.save();
    console.log("done");
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export async function getQuiz(id: string): Promise<DBQuiz[]> {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`);
  }
  try {
    return QuizSchema.find({ owner: id }).sort({ createdAt: "desc" });
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export async function getQuizByID(id: string): Promise<DBQuiz> {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`);
  }
  try {
    const dataa = QuizSchema.findById(id);
    if (dataa === null) throw new Error("not found stuff");
    return dataa;
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export async function addSessionToDB(data: QuizSession | null) {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`);
  }
  try {
    if (!data) {
      throw new Error(`data is null`);
    }
    const dataa = new QuizSessionSchema(data);
    await dataa.save();
  } catch (e) {
    throw new Error(`${e}`);
  }
}
