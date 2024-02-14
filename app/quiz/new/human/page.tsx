"use client";

import { Choice, Quizes } from "@/app/libs/quizActions";
import React, { useState } from "react";
import { uid } from "uid";

export default function HumanQuiz() {
  const [question, setQuesion] = useState("");
  const [val, setVal] = useState(1);
  const [text, setText] = useState<{
    0: string;
    1: string;
    2: string;
    3: string;
  }>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [quizes, setQuizes] = useState<Quizes[]>([]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Object.values(text).every((el) => Boolean(el))) return;
    if (!val) return;
    console.log(val);
    console.log(Object.values(text));
    setQuizes((prev) => {
      const choicesGonnaAdd: Choice[] = Object.values(text).map((e, i) => {
        return {
          choice: e,
          correct: i + 1 === val,
          id: uid(6),
        };
      });

      return [
        ...prev,
        { question: question, choices: choicesGonnaAdd, id: uid() },
      ];
    });

    setQuesion("");
    setText({ 0: "", 1: "", 2: "", 3: "" });
  }
  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          className="input"
          placeholder="question"
          name="question"
          value={question}
          onChange={(e) => setQuesion(e.target.value)}
        />
        <div className="">
          <input
            type="text"
            name="0"
            value={text[0]}
            onChange={(e) => {
              setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
          <input
            type="radio"
            name="test123"
            value={1}
            onChange={(e) => setVal(Number(e.target.value))}
            checked={val === 1}
          />
        </div>
        <div className="">
          <input
            type="text"
            name="1"
            value={text[1]}
            onChange={(e) => {
              setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
          <input
            type="radio"
            name="test123"
            value={2}
            onChange={(e) => setVal(Number(e.target.value))}
            checked={val === 2}
          />
        </div>
        <div className="">
          <input
            type="text"
            name="2"
            value={text[2]}
            onChange={(e) => {
              setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
          <input
            type="radio"
            name="test123"
            value={3}
            onChange={(e) => setVal(Number(e.target.value))}
            checked={val === 4}
          />
        </div>
        <div className="">
          <input
            type="text"
            name="3"
            value={text[3]}
            onChange={(e) => {
              setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
          <input
            type="radio"
            name="test123"
            value={4}
            onChange={(e) => setVal(Number(e.target.value))}
            checked={val === 4}
          />
        </div>
        <button>send</button>
      </form>
      {quizes.map(({ choices, id, question }) => (
        <div key={id} className="p-6">
          <h1>{question}</h1>
          {choices.map((e) => (
            <p
              key={e.id}
              className={`${
                e.correct ? "text-green-500 font-bold" : "text-red-500"
              }`}
            >
              {e.choice}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
