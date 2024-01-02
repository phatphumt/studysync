import React from "react";
/* import { doc, getDoc } from "firebase/firestore";
import FlashcardEditor from "./FlashcardEditor"; */
import { redirect } from "next/navigation";

/* type Data = {
  owner: string;
  createdAt: { seconds: number; nanoseconds: number };
  flashcards: [{ answer: string; question: string; id: string }];
  name: string;
}; */

const EditPage = () => {
  redirect("/flashcard/list");
  return <></>;
};

export default EditPage;
