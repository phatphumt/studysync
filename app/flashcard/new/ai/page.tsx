"use client";

import { addToDB, generateFlashcard } from "@/app/config/flashcardActions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { uid } from "uid";

type Flashcards = {
  question: string;
  answer: string;
};

const FlashcardAIGen = () => {
  const { user } = useKindeBrowserClient();
  const [d, setD] = useState<Flashcards[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [pending, setPending] = useState(false);
  return (
    <div className="p-5">
      <form
        action={async (e) => {
          setPending(true);
          setTimeout(async () => {
            const a = await generateFlashcard(e);
            const data = JSON.parse(a);
            setD(data as Flashcards[]);
            setPending(false);
          }, 100);
        }}
      >
        <input
          type="text"
          name="topic"
          placeholder="topic"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="text"
          name="choices"
          placeholder="choices"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        <br />
        <br />
        <button type="submit" className="btn" disabled={pending}>
          get the fucking data
        </button>
        <br />
        {d && (
          <div>
            {d.map((i) => (
              <p key={uid(2)}>
                <span className="text-lg font-semibold">{i.question}</span>
                <br />
                {i.answer}
                <br />
              </p>
            ))}
          </div>
        )}
        <br />
        <button
          className="btn"
          onClick={async () => {
            addToDB(d, user?.id as string, topic);
          }}
          type="button"
          disabled={d.length === 0}
        >
          ADD to db
        </button>
      </form>
    </div>
  );
};

export default FlashcardAIGen;
