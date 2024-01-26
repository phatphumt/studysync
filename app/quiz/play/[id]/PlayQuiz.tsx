"use client";

import { DBQuiz } from "@/app/libs/quizActions";
import React from "react";
import { uid } from "uid";
import Link from "next/link";

export default function PlayQuiz(props: DBQuiz) {
  const sessionID = uid();
  function click() {
    localStorage.removeItem("currentQuiz");
    const thedata = {
      sessionID,
      correct: [],
      wrong: [],
      quizes: props.quizes,
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
