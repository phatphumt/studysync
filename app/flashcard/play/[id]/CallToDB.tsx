"use client";
import { TheFlashcard } from "@/app/libs/flashcardActions";
import Link from "next/link";
import * as uuid from "uid";

type Data = {
  _id: string;
  createdAt: string;
} & TheFlashcard;

const CallToDB = ({ id, data }: { id: string; data: Data }) => {
  const sessionID = uuid.uid(15);
  function click() {
    const thedata = {
      sessionID,
      correct: [],
      wrong: [],
      flashcards: data.flashcards,
      id,
    };
    localStorage.setItem("hello", JSON.stringify(thedata));
  }
  return (
    <>
      <Link href={`/flashcard/play/${id}/${data.flashcards[0].id}`}>
        <button className="btn btn-primary btn-outline" onClick={click}>
          add
        </button>
      </Link>
    </>
  );
};

export default CallToDB;
