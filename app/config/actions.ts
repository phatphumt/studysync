"use server"

import { connect } from "mongoose";
import { redirect } from "next/navigation";
import { uid } from "uid";
import {flaschard} from "@/models/Flashcard"
type Flashcards = {
  question: string;
  answer: string;
};

export async function addToDB(dataa: Flashcards[], userID: string, name: string) {
  console.log(process.env.MONGO_URI)
  try {
    await connect(process.env.MONGO_URI as string)
  } catch (e) {
    console.log(e)
    return;
  }
  console.log('db connected')
  const dataWithID = dataa.map((i) => ({ ...i, id: uid() }));
  const docData = {
    flashcards: [...dataWithID],
    owner: userID,
    name: name,
  };
  console.log(docData)
  try {
    await flaschard.create(docData)
    console.log('done')
  } catch (e) {
    console.log('error')
  }
  redirect('/')
}