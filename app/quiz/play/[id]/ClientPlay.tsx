"use client";

import { DBQuiz } from "@/app/config/quizActions";
import React from "react";
import { uid } from "uid";
import shuffleArray from "array-shuffle";
import Link from "next/link";

export default function ClientPlay(props: DBQuiz) {
  const sessionID = uid();
  function click() {
    const thedata = {
      sessionID,
      correct: [],
      wrong: [],
      quizes: shuffleArray(props.quizes),
      id: props._id,
    };
    localStorage.setItem("currentQuiz", JSON.stringify(thedata));
  }
  return (
    <>
      <Link href={`/flashcard/play/${props._id}`}></Link>
      <button
        className="btn btn-primary btn-outline mb-3 btn-xs"
        onClick={click}
      >
        add
      </button>
      <button
        className="btn btn-primary btn-outline btn-xs"
        onClick={() => localStorage.clear()}
      >
        clear
      </button>
    </>
  );
}
