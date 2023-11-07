"use client";
import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import useCheckCredentials from "@/app/useCheckCredentials";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as uuid from "uid";

type Data = {
  question: string;
  answer: string;
};

type Body = { choices: string; topic: string };

const FlashcardAIGen = () => {
  useCheckCredentials();
  const [data, setData] = useState<Data[]>([]);
  const [body, setBody] = useState<Body>({ choices: "", topic: "" });
  const [error, setErorr] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const user = useAuth();
  const router = useRouter();

  async function click() {
    setData([]);
    setStatus("getting data");
    const a = await fetch("http://localhost:4000/ai/flashcard/test");
    const datata = await a.json();
    setBody((prev) => ({ ...prev, topic: "testing" }));
    console.log(datata);
    setData(datata);
    setStatus(null);
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([]);
    setStatus("getting data");
    const d = await fetch("http://localhost:4000/ai/flashcard/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!d.ok) {
      const error = await d.json();
      setErorr(`error: ${error.error}`);
      setStatus("error");
      return;
    }
    const datata = await d.json();
    setData(datata);
    setStatus(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(body);
  };

  async function addToDB() {
    console.log("adding");
    if (!user?.user?.uid) return;
    const uid: string = user?.user?.uid;
    const docData = {
      flashcards: [...data],
      owner: uid,
      name: `${body.topic} flashcard`,
    };
    console.log(docData);
    await setDoc(doc(db, "flashcards", uuid.uid(25)), docData);
    console.log("done");
    setData([]);
    router.push("/flashcard/list");
  }

  return (
    <div className="p-5">
      <button className="btn mb-5" onClick={click}>
        get dummy data
      </button>
      <form onSubmit={submit}>
        <input
          type="text"
          name="topic"
          placeholder="topic"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
          onChange={handleChange}
          value={body.topic}
        />
        {"     "}
        <input
          type="number"
          name="choices"
          placeholder="choices"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
          onChange={handleChange}
          value={body.choices}
        />
        <br />
        <br />
        <button className="btn mb-5" onClick={click}>
          get custom data
        </button>
      </form>
      {data ? (
        <div>
          {data.map((i, ii) => (
            <div key={ii}>
              <p className="font-bold">{i.question}</p>
              <p className="text-sm">{i.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>loading or no data</p>
      )}
      {status && <p>{status}</p>}
      {error && <p className="font-bold text-red-700">{error}</p>}
      <br />
      <button className="btn btn-sm" onClick={() => console.log(data)}>
        current data
      </button>
      <button className="btn btn-sm mx-3" onClick={addToDB}>
        add to db
      </button>
    </div>
  );
};

export default FlashcardAIGen;
