"use client";
import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import useCheckCredentials from "@/app/useCheckCredentials";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import * as uuid from "uid";

type Flashcard = {
  question: string;
  answer: string;
};

const HumanFlashcard = () => {
  const [data, setData] = useState<Flashcard[]>([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswer] = useState("");
  const user = useAuth();
  useCheckCredentials("/login");
  const [name, setName] = useState("untitled flashcard");
  // const [nameBool, setNameBool] = useState(true);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user?.user?.uid) return;
    if (name === "") {
      alert("names can't be empty");
      return;
    }
    const uid: string = user?.user?.uid;
    const dataWithID = data.map((i) => ({ ...i, id: uuid.uid() }));
    const docData = {
      flashcards: [...dataWithID],
      owner: uid,
      name: name,
      createdAt: serverTimestamp(),
    };
    console.log(docData);
    await setDoc(doc(db, "flashcards", uuid.uid(25)), docData);
    console.log("done");
    router.push("/flashcard/list");
  }

  function click() {
    if (question === "" || answers === "") return;
    setData((prev) => [...prev, { question: question, answer: answers }]);
    setQuestion("");
    setAnswer("");
  }

  function removeitem(index: number) {
    const newArray: any[] = [];
    data.forEach((i, indexa) => {
      if (indexa === index) return;
      newArray.push(i);
    });
    setData(newArray);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mx-8 mt-10 mb-2">Add flashcard</h1>
      <div className="m-9 mt-0">
        <div className="mb-3">
          <input
            type="text"
            name="question"
            placeholder="question"
            className="input input-bordered input-primary w-[10%] focus:outline-none"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            value={question}
          />
          {"     "}
          <input
            type="text"
            name="answer"
            placeholder="answer"
            className="input input-bordered input-primary w-[10%] focus:outline-none"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            value={answers}
          />
          <br />
          <br />
          <button className="btn mb-5 btn-sm" onClick={click} type="button">
            add flashcard
          </button>
          <button
            className="btn mx-2 btn-sm"
            onClick={() => {
              if (!confirm("wanna clear?")) return;
              setData([]);
            }}
          >
            clear
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <span className="font-bold text-xl">Flashcard {name}</span>
          <br />
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered input-primary w-[10%] focus:outline-none input-xs"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <br />
          <div className="my-3">
            {data.length !== 0 ? (
              data.map((i, index) => (
                <div key={index}>
                  {index + 1} - {i.question} | {i.answer}{" "}
                  <span
                    className="select-none cursor-pointer font-bold text-red-800"
                    onClick={() => removeitem(index)}
                  >
                    (remove)
                  </span>
                </div>
              ))
            ) : (
              <p>no flashcards were added</p>
            )}
          </div>
          <button
            type="submit"
            disabled={data.length < 1}
            className="btn btn-sm"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HumanFlashcard;
