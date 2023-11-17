"use client";

import { db } from "@/app/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

const FlashcardItemPage = ({ params }: Props) => {
  const [dt, setDt] = useState<any>();
  useEffect(() => {
    async function a() {
      try {
        console.log("started fectching");
        const doac = doc(db, "flashcards", params.id);
        const data = await getDoc(doac);
        setDt(data.data());
        console.log(data.data());
      } catch (e) {
        console.error(e);
        alert(`error: ${e}`);
      }
    }
    a();
  }, [params.id]);

  function changeFlashcard(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    /* setDt((prev: any) => {
      const a = prev.flashcards[i]; debugger;
      const b = {...a, [e.target.name]: e.target.value}; debugger;
      const c = {...prev, flashcards: [...prev.flashcards, ...b]}
      console.log(a)
      return prev;
    }) */
    /* const currentitem = {...dt.flashcards[i], [e.target.name]: e.target.value}
    const b = {...dt, flashcards: [...dt.flashcards, currentitem]}
    const c = dt.flashcards.filter((i: any) => i !== dt.flashcards[i].id) */
    for (let j = 0; j < dt.flashcards.length; j++) {
      if (dt.flashcards[j].id === dt.flashcards[i].id) {
        console.log(`is = `, dt.flashcards[j])
      }
      console.log(`is not = `, dt.flashcards[j])
    }
    console.log(dt.flashcards.length)
    console.log(e.target.name ,e.target.value)
  }

  return (
    <>
      {dt && (
        <div>
          <h1 className="font-bold">{dt.name}</h1>
          {dt.flashcards.map((i: any, j: number) => (
            <div key={i.id}>
              <label htmlFor="question">Question: </label>
              <input
                type="text"
                value={i.question}
                id="question"
                name="question"
                className="input input-sm input-bordered"
                onChange={(e) => changeFlashcard(e, j)}
              />
              <label htmlFor="answer">Answer: </label>
              <input
                type="text"
                value={i.answer}
                name="answer"
                id="answer"
                className="input input-sm input-bordered"
                onChange={(e) => changeFlashcard(e, j)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FlashcardItemPage;
