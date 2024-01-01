"use client";
import { useRouter } from "next/navigation";
import * as uuid from "uid";

type Data = {
  question: string;
  answer: string;
};

type Body = { choices: string; topic: string };

const FlashcardAIGen = () => {
  const router = useRouter();
  const dataa: Data[] = [];
  async function ai() {}

  async function addToDB() {
    console.log("adding");
    router.push("/flashcard/list");
  }

  return (
    <div className="p-5">
      <form action={ai}>
        <input
          type="text"
          name="topic"
          placeholder="topic"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        {"     "}
        <input
          type="number"
          name="choices"
          placeholder="choices"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        <br />
        <br />
        <button className="btn mb-5">get custom data</button>
      </form>
      {dataa ? (
        <div>
          {dataa.map((i, ii) => (
            <div key={ii}>
              <p className="font-bold">{i.question}</p>
              <p className="text-sm">{i.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>loading or no data</p>
      )}
      <button className="btn btn-sm mx-3" onClick={addToDB}>
        add to db
      </button>
    </div>
  );
};

export default FlashcardAIGen;
