"use client";
import useCheckCredentials from "@/app/useCheckCredentials";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

type Dataa = {
  sessionID: string;
  correct: number;
  wrong: number;
  flashcards: { answer: string; question: string; id: string }[];
  id: string;
};

const FlashcardPlayer = ({ currentID }: { currentID: string }) => {
  useCheckCredentials("/flashcard/list");
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState<Dataa>({
    sessionID: "",
    correct: 0,
    wrong: 0,
    flashcards: [],
    id: "",
  });
  const [curr, setCurr] = useState<{
    answer: string;
    question: string;
    id: string;
  }>();

  useEffect(() => {
    const data = localStorage.getItem("hello");
    if (!data) {
      redirect("/");
    }
    const dataa: Dataa = JSON.parse(data);
    setData(dataa);
    setCurr(dataa.flashcards.find((e) => e.id === currentID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCorrect() {
    setData((prev) => {
      return { ...prev, correct: prev.correct + 1 };
    });
    if (
      !data.flashcards[data.flashcards.findIndex((e) => e.id === currentID) + 1]
    ) {
      redirect("/");
    }
    redirect();
  }

  function handleWrong() {
    setData((prev) => {
      return { ...prev, wrong: prev.wrong + 1 };
    });
    // redirect(`/flashcard/play/${flashcardID}/${next}`)
    console.log(data);
  }

  return (
    <>
      <label
        className={!flipped ? "swap swap-flip" : "swap swap-active swap-flip"}
      >
        <div className="swap-off">
          <p className="text-3xl">{curr?.question}</p>
          <button
            className="text-xl"
            onClick={() => setFlipped((prev) => !prev)}
            type="button"
          >
            🔄
          </button>
        </div>
        <div className="swap-on">
          <p className="text-3xl">{curr?.answer}</p>
          <Link
            href={`/flashcard/play/${data.id}/${
              data.flashcards[
                data.flashcards.findIndex((e) => e.id === currentID) + 1
              ].id
            }`}
          >
            <button
              className="btn btn-xs btn-info mr-3 transition-all active:scale-95"
              type="button"
              onClick={handleCorrect}
            >
              correct
            </button>
          </Link>
          <button
            className="btn btn-xs btn-info mr-3 transition-all active:scale-95"
            type="button"
            onClick={handleWrong}
          >
            wrong
          </button>
          <button
            className="text-xl"
            onClick={() => setFlipped((prev) => !prev)}
            type="button"
          >
            🔄
          </button>
        </div>
      </label>
    </>
  );
};

export default FlashcardPlayer;
