"use server";

import { connect } from "mongoose";
import { redirect } from "next/navigation";
import { uid } from "uid";
import Flashcard from "../models/FlashcardSchema";
import OpenAI from "openai";
type Flashcards = {
  question: string;
  answer: string;
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
    return data.choices[0].message.content as string
  } catch (e) {
    return `${e}`
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
  redirect("/");
}
