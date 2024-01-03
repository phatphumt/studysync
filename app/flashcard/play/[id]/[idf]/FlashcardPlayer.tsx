"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Dataa = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  flashcards: { answer: string; question: string; id: string }[];
  id: string;
};

const FlashcardPlayer = ({ currentID }: { currentID: string }) => {
  const { push } = useRouter();
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState<Dataa>({
    sessionID: "",
    correct: [],
    wrong: [],
    flashcards: [],
    id: "",
  });
  const [curr, setCurr] = useState<{
    answer: string;
    question: string;
    id: string;
  }>({ answer: "", question: "", id: "" });

  useEffect(() => {
    const data = localStorage.getItem("hello");
    if (!data) {
      redirect("/");
    }
    const dataa: Dataa = JSON.parse(data);
    setData(dataa);
    setCurr(
      dataa.flashcards.find((e) => e.id === currentID) as {
        answer: string;
        question: string;
        id: string;
      }
    );
    console.log(dataa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCorrect() {
    const dataaa = [...data.correct, currentID];
    if (!dataaa) {
      return;
    }
    const datata = {
      ...data,
      correct: dataaa
    }
    localStorage.setItem("hello", JSON.stringify(datata as any));
    if (
      !data.flashcards[data.flashcards.findIndex((e) => e.id === currentID) + 1]
    ) {
      push(`/flashcard/summary/${data.id}`);
      return;
    }
    push(
      `/flashcard/play/${data.id}/${
        data.flashcards[
          data.flashcards.findIndex((e) => e.id === currentID) + 1
        ].id
      }`
    );
  }

  function handleWrong() {
    const dataaa = [...data.wrong, currentID];
    if (!dataaa) {
      return;
    }
    const datata = {
      ...data,
      wrong: dataaa
    } 
    localStorage.setItem("hello", JSON.stringify(datata as any));
    if (
      !data.flashcards[data.flashcards.findIndex((e) => e.id === currentID) + 1]
    ) {
      push(`/flashcard/summary/${data.id}`);
      return;
    }
    push(
      `/flashcard/play/${data.id}/${
        data.flashcards[
          data.flashcards.findIndex((e) => e.id === currentID) + 1
        ].id
      }`
    );
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
          <button
            className="btn btn-xs btn-info mr-3 transition-all active:scale-95"
            type="button"
            onClick={handleCorrect}
          >
            correct
          </button>
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
