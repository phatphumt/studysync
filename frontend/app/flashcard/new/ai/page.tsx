"use client";
import useCheckCredentials from "@/app/useCheckCredentials";
import React, { useState } from "react";

type Data = {
  question: string;
  answer: string;
};

type Body = { choices: string; topic: string };

const FlashcardAIGen = () => {
  useCheckCredentials();
  const [data, setData] = useState<null | Data[]>(null);
  const [body, setBody] = useState<Body>({ choices: "", topic: "" });
  const [error, setErorr] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function click() {
    setData(null);
    setStatus("getting data");
    const a = await fetch("http://localhost:4000/ai/flashcard/test");
    const datata = await a.json();
    console.log(datata);
    setData(datata);
    setStatus(null);
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(null);
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
    </div>
  );
};

export default FlashcardAIGen;
