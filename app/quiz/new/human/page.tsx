"use client";
import { addToDB } from "@/app/config/flashcardActions";
import { Quiz, Quizes } from "@/app/config/quizActions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import { uid } from "uid";
const HumanQuiz = () => {
  const questionRef = useRef<HTMLInputElement>(null);
  const choice1Ref = useRef<HTMLInputElement>(null);
  const choice2Ref = useRef<HTMLInputElement>(null);
  const choice3Ref = useRef<HTMLInputElement>(null);
  const choice4Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const correct1Ref = useRef<HTMLInputElement>(null);
  const correct2Ref = useRef<HTMLInputElement>(null);
  const correct3Ref = useRef<HTMLInputElement>(null);
  const correct4Ref = useRef<HTMLInputElement>(null);
  const [quiz, setQuiz] = useState<Quizes[]>([]);
  function addChoice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuiz((prev) => [
      ...prev,
      {
        question: questionRef.current?.value as string,
        choices: [
          {
            choice: choice1Ref.current?.value as string,
            correct: correct1Ref.current?.checked as boolean,
            id: uid(5),
          },
          {
            choice: choice2Ref.current?.value as string,
            correct: correct2Ref.current?.checked as boolean,
            id: uid(5),
          },
          {
            choice: choice3Ref.current?.value as string,
            correct: correct3Ref.current?.checked as boolean,
            id: uid(5),
          },
          {
            choice: choice4Ref.current?.value as string,
            correct: correct4Ref.current?.checked as boolean,
            id: uid(5),
          },
        ],
      },
    ]);
    choice1Ref.current!.value = "";
    choice2Ref.current!.value = "";
    choice3Ref.current!.value = "";
    choice4Ref.current!.value = "";
    questionRef.current!.value = "";
  }
  return (
    <>
      <h1 className="text-2xl font-bold mx-8 mt-10 mb-2">Add Quiz</h1>
      <div className="m-9 mt-0">
        <form className="mb-3" onSubmit={addChoice}>
          <div className="">
            <input
              type="text"
              name="question"
              placeholder="question"
              className="input input-bordered input-primary w-[20%] focus:outline-none"
              ref={questionRef}
            />
            <br />
            {"     "}
            <input
              type="text"
              name="choice1"
              placeholder="choice 1"
              className="input input-bordered input-primary w-[10%] focus:outline-none input-sm mr-2"
              ref={choice1Ref}
            />
            <input
              type="checkbox"
              name="correct"
              id="correct"
              defaultChecked={true}
              ref={correct1Ref}
            />
            <br />
            <input
              type="text"
              name="choice2"
              placeholder="choice 2"
              className="input input-bordered input-primary w-[10%] focus:outline-none input-sm mr-2"
              ref={choice2Ref}
            />
            <input
              type="checkbox"
              name="correct"
              id="correct"
              ref={correct2Ref}
            />
            <br />
            <input
              type="text"
              name="choice3"
              placeholder="choice 3"
              className="input input-bordered input-primary w-[10%] focus:outline-none input-sm mr-2"
              ref={choice3Ref}
            />
            <input
              type="checkbox"
              name="correct"
              id="correct"
              ref={correct3Ref}
            />
            <br />
            <input
              type="text"
              name="choice4"
              placeholder="choice 4"
              className="input input-bordered input-primary w-[10%] focus:outline-none input-sm mr-2"
              ref={choice4Ref}
            />
            <input
              type="checkbox"
              name="correct"
              id="correct"
              ref={correct4Ref}
            />
          </div>
          <br />
          <br />
          <button className="btn mb-5 btn-sm">add quiz</button>
          <button className="btn mx-2 btn-sm" type="button">
            clear
          </button>
        </form>
        <form>
          <span className="font-bold text-xl">
            Quiz {nameRef.current?.value}
          </span>
          <br />
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered input-primary w-[10%] focus:outline-none input-xs"
            ref={nameRef}
          />
          <br />
          <div className="my-3">
            <div>
              1: a | a {"  "}
              <span className="select-none cursor-pointer font-bold text-red-800">
                (remove)
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-sm">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HumanQuiz;
