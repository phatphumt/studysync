"use client";
import Link from "next/link";
import { useRef, useState } from "react";
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
  const refffff = useRef<HTMLInputElement | null>(null)
  return (
    <>
      <Link href={`/flashcard/play/${id}/${data.flashcards[0].id}`}>
        <button className="btn btn-primary btn-outline" onClick={click}>
          add
        </button>
      </Link>
      <input type="checkbox" ref={refffff} />
      <button className="btn" onClick={() => {
        const shuffle = <T,>(array: T[]) => {
          return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        };
        const a = shuffle(data.flashcards)
        console.log(a)
        console.log(refffff.current?.checked)
      }}>random</button>
    </>
  );
};

export default CallToDB;
