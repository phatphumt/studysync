"use client";

import { DBQuiz } from "@/app/actions/quizActions";
import React from "react";
import { uid } from "uid";
import shuffleArray from "array-shuffle";
import Link from "next/link";

export default function PlayQuiz(props: DBQuiz) {
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
      <Link href={`/quiz/play/${props._id}/${props.quizes[0].id}`}>
      <button
        className="btn btn-primary btn-outline mb-3 btn-xs"
        onClick={click}
      >
        add
      </button>
      </Link>
      <button
        className="btn btn-primary btn-outline btn-xs"
        onClick={() => localStorage.clear()}
      >
        clear
      </button>
    </>
  );
}
