"use client";

import { addToDB } from "@/app/libs/quizActions";
import { Choice, Quizes } from "@/app/libs/quizActions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { uid } from "uid";

export default function HumanQuiz() {
  return (
    <>
      <QuizForm />
    </>
  );
}

function CustomRadio({
  click,
  vari,
  val,
}: {
  click: () => void;
  vari: number;
  val: number;
}) {
  return (
    <div
      onClick={() => {
        click();
      }}
      className={`p-1 rounded-full absolute top-2 left-2 ${
        vari !== val
          ? "bg-red-500 hover:shadow-lg hover:cursor-pointer hover:scale-95"
          : "bg-green-500 hover:shadow-lg hover:cursor-pointer hover:scale-95"
      }`}
    ></div>
  );
}

function QuizForm() {
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
    <div className="flex items-center justify-center h-[91vh] ">
      <div className="w-[50%] h-[100%] flex justify-center items-center">
        <form
          onSubmit={submit}
          className="flex flex-col w-[100%] mx-[10%] py-16 rounded-2xl bg-slate-200 items-center space-y-3"
        >
          <h1 className="font-bold text-3xl text-center">Add a Question</h1>
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder="question"
            name="question"
            value={question}
            onChange={(e) => setQuesion(e.target.value)}
          />
          <div className="bg-main w-min p-4 rounded-md relative">
            <input
              type="text"
              name="0"
              value={text[0]}
              onChange={(e) => {
                setText((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input input-xs"
              placeholder="choice 1"
            />
            <CustomRadio
              click={() => {
                setVal(1);
              }}
              val={1}
              vari={val}
            />
          </div>
          <div className="bg-main w-min p-4 rounded-md relative">
            <input
              type="text"
              name="1"
              value={text[1]}
              onChange={(e) => {
                setText((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input input-xs"
              placeholder="choice 2"
            />
            <CustomRadio
              click={() => {
                setVal(2);
              }}
              val={2}
              vari={val}
            />
          </div>
          <div className="bg-main w-min p-4 rounded-md relative">
            <input
              type="text"
              name="2"
              value={text[2]}
              onChange={(e) => {
                setText((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input input-xs"
              placeholder="choice 3"
            />
            <CustomRadio
              click={() => {
                setVal(3);
              }}
              val={3}
              vari={val}
            />
          </div>
          <div className="bg-main w-min p-4 rounded-md relative">
            <input
              type="text"
              name="3"
              value={text[3]}
              onChange={(e) => {
                setText((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              placeholder="choice 4"
              className="input input-xs"
            />
            <CustomRadio
              click={() => {
                setVal(4);
              }}
              val={4}
              vari={val}
            />
          </div>
          <button className="text-white btn btn-sm btn-success active:scale-95 transition-all">
            Add
          </button>
        </form>
      </div>
      <div className="w-[50%]">
        <QuizPreview quizes={quizes} />
      </div>
    </div>
  );
}

function QuizPreview({ quizes }: { quizes: Quizes[] }) {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [quizName, setQuizName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-slate-200 w-[100%]">
      {quizes.length === 0 ? (
        <p>You don{"'"}t have any questions yet</p>
      ) : (
        <>
          <input
            type="text"
            value={quizName}
            placeholder="name of quiz"
            className="input input-bordered input-sm"
            onChange={(e) => setQuizName(e.target.value)}
          />
          {quizes.map(({ choices, id, question }) => (
            <div key={id} className="p-6">
              <h1 className="font-semibold text-xl underline">{question}</h1>
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
          <button
            className="btn btn-sm"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              if (!quizName) {
                console.log("quiz name missing");
                return;
              }
              await addToDB({
                name: quizName,
                owner: user?.id as string,
                quizes: quizes,
              });
              router.push("/quiz/list");
            }}
          >
            add to db
          </button>
        </>
      )}
    </div>
  );
}
