"use server";

import { connect, disconnect } from "mongoose";
import { redirect } from "next/navigation";
import { uid } from "uid";
import Flashcard from "../models/FlashcardSchema";
import OpenAI from "openai";
import FlashcardSessionSchema from "../models/FlashcardSessionSchema";
import FlashcardSchema from "../models/FlashcardSchema";

type Flashcards = {
  question: string;
  answer: string;
};

export type IDedFlashcard = Flashcards & {id: string}

export type TheFlashcard = {
  name: string;
  owner: string;
  flashcards: IDedFlashcard[];
};

type FlashcardSession = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  flashcards: { answer: string; question: string; id: string }[];
  id: string;
};

export async function generateFlashcard(formData: FormData) {
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
          content: `you are a flashcard generator. you will get the amount of flashcard that you will generate and the topic of that question. return to user with the following json document format without deviation. \n
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
    return data.choices[0].message.content as string;
  } catch (e) {
    return `${e}`;
  }
}

export async function addToDB(
  dataa: Flashcards[],
  userID: string,
  name: string
) {
  console.log(process.env.MONGO_URI);
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    console.log(e);
    return;
  }
  console.log("db connected");
  const dataWithID = dataa.map((i) => ({ ...i, id: uid() }));
  const docData = {
    flashcards: [...dataWithID],
    owner: userID,
    name: name,
  };
  console.log(docData);
  try {
    const data = new Flashcard(docData);
    await data.save();
    console.log("done");
  } catch (e) {
    console.log("error");
  }
  await disconnect();
  redirect("/flashcard/list");
}

export async function addSessionToDB(data: FlashcardSession) {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`)
  }
  try {
    const asd = new FlashcardSessionSchema(data);
    await asd.save();
    console.log("done");
  } catch (e) {
    throw new Error(`${e}`)
  }
  await disconnect();
}

export async function deleteItem(id: string){
  "use server"
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`)
  }
  try {
    await FlashcardSchema.findByIdAndDelete(id)
    console.log("done");
  } catch (e) {
    throw new Error(`${e}`)
  }
}

export async function getFlashcard(id: string): Promise<TheFlashcard> {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`)
  }
  try {
    const data = await FlashcardSchema.findById(id)
    return data
  } catch (e) {
    throw new Error(`${e}`)
  }
}

export async function updateFlashcard(prev: TheFlashcard, neww: IDedFlashcard[], id: string) {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (e) {
    throw new Error(`${e}`)
  }
  try {
    await FlashcardSchema.findByIdAndUpdate(id, {...prev, flashcards: neww})
  } catch (e) {
    throw new Error(`${e}`)
  }
}