"use client";

import { Choice, QuizSession, Quizes } from "@/app/actions/quizActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function QuizPlayer({ params }: { params: { quiz: string } }) {
  const [data, setData] = useState<QuizSession>({correct: [], id: "", quizes: [], sessionID: '', wrong: []});
  const [quiz, setQuiz] = useState<Quizes>();
  const [answeredQuiz, setAnsweredQuiz] = useState<string | undefined>();
  const [answered, setAnswered] = useState<boolean>(false);
  const { push } = useRouter();
  useEffect(() => {
    const datatata = localStorage.getItem("currentQuiz");
    if (datatata === null) push("/quiz/list");
    const theData: QuizSession = JSON.parse(datatata as string);
    console.log(theData);
    setData(theData);
    setQuiz(theData.quizes.find((e) => e.id === params.quiz));
  }, []);
  function clickcc(item: Choice) {
    setAnswered(true);
    setAnsweredQuiz(item.id);
    console.log(item);
    if (item.correct) {
      const sgb = {...data, correct: [...data.correct, params.quiz]}
      console.log(sgb)
      localStorage.setItem("currentQuiz", JSON.stringify(sgb))
    }
    if (!item.correct) {
      const sgb = {...data, wrong: [...data.wrong, params.quiz]}
      console.log(sgb)
      localStorage.setItem("currentQuiz", JSON.stringify(sgb))
    }
  }
  return (
    <div className="h-[91vh] flex justify-center items-center flex-col">
      {quiz && <h1 className="font-semibold text-2xl mb-3">{quiz.question}</h1>}
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        {quiz &&
          quiz.choices.map((e) => (
            <button
              className={`text-center p-4 rounded-lg select-none cursor-pointer transition-all duration-100 ${
                answered ? "cursor-auto" : "active:scale-95 hover:scale-105"
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
    </div>
  );
}
