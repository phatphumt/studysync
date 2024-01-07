"use client";
import Link from "next/link";
import * as uuid from "uid";

type Data = {
  _id: string;
  flashcards: { answer: string; question: string; id: string }[];
  owner: string;
  name: string;
  createdAt: string;
};

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
