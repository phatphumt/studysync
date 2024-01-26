"use client";

import {
  Choice,
  CorrectWrong,
  QuizSession,
  Quizes,
} from "@/app/libs/quizActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import shuffleArray from "array-shuffle";

export default function QuizPlayer({ params }: { params: { quiz: string } }) {
  const [data, setData] = useState<QuizSession>({
    correct: [],
    id: "",
    quizes: [],
    sessionID: "",
    wrong: [],
  });
  const [quiz, setQuiz] = useState<Quizes>({
    choices: [],
    id: "",
    question: "",
  });
  const [answeredQuiz, setAnsweredQuiz] = useState<string | undefined>();
  const [answered, setAnswered] = useState<boolean>(false);
  const { push } = useRouter();
  useEffect(() => {
    const datatata = localStorage.getItem("currentQuiz");
    if (datatata === null) push("/quiz/list");
    const theData: QuizSession = JSON.parse(datatata as string);
    console.log(theData);
    setData(theData);
    const data = theData.quizes.find((e) => e.id === params.quiz);
    if (!data) {
      console.error("no such quiz in a localstorage");
      throw new Error("no such quiz in a localstorage");
    }
    const shuffledChoice: Quizes = {
      ...data,
      choices: shuffleArray(data.choices),
    };
    setQuiz(shuffledChoice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isNotLast = () =>
    data.quizes.findIndex((e) => e.id === params.quiz) !==
    data.quizes.length - 1;
  function clickcc(item: Choice) {
    setAnswered(true);
    setAnsweredQuiz(item.id);
    console.log(isNotLast());
    console.log(item);
    if (item.correct) {
      const asd: CorrectWrong = { answeredID: item.id, quizID: params.quiz };
      const sgb = { ...data, correct: [...data.correct, asd] };
      console.log(sgb);
      localStorage.setItem("currentQuiz", JSON.stringify(sgb));
    }
    if (!item.correct) {
      const asd: CorrectWrong = { answeredID: item.id, quizID: params.quiz };
      const sgb = { ...data, wrong: [...data.wrong, asd] };
      console.log(sgb);
      localStorage.setItem("currentQuiz", JSON.stringify(sgb));
    }
  }
  return (
    <div className="h-[91vh] flex justify-center items-center flex-col">
      {quiz && <h1 className="font-semibold text-2xl mb-3">{quiz.question}</h1>}
      <div className="grid grid-cols-2 grid-rows-2 gap-3 mb-3">
        {quiz &&
          quiz.choices.map((e) => (
            <button
              key={uid(2)}
              className={`text-center p-4 rounded-lg select-none cursor-pointer transition-all duration-100 ${
                answered
                  ? "cursor-default opacity-95"
                  : "active:scale-95 hover:scale-105"
              } ${
                e.correct && answered
                  ? "bg-green-500 text-white"
                  : answered && e.id === answeredQuiz
                  ? "bg-red-500 text-white"
                  : "bg-slate-100"
              }`}
              onClick={() => clickcc(e)}
              disabled={answered}
            >
              {e.choice}
            </button>
          ))}
      </div>
      {answered ? (
        isNotLast() ? (
          <Link
            href={`/quiz/play/${data.id}/${
              data.quizes[
                data.quizes.findIndex((e) => e.id === params.quiz) + 1
              ].id
            }`}
          >
            Next
          </Link>
        ) : (
          <Link href={`/quiz/summary`}>Done</Link>
        )
      ) : null}
    </div>
  );
}
