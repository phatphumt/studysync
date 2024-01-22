"use client";

import { Quizes, generateQuiz, addToDB, Quiz } from "@/app/actions/quizActions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { emit } from "process";
import { useState } from "react";
import { uid } from "uid";

const FlashcardAIGen = () => {
  const { user } = useKindeBrowserClient();
  const [d, setD] = useState<Quizes[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [pending, setPending] = useState(false);
  const { push } = useRouter();
  return (
    <div className="p-5">
      <form
        action={async (e) => {
          setD([]);
          setPending(true);
          setTimeout(async () => {
            const stringg = await generateQuiz(e);
            const a = JSON.parse(stringg) as Quizes[];
            const b = a.map((e) => ({
              ...e,
              id: uid(6),
              choices: e.choices.map((ele) => ({ ...ele, id: uid(6) })),
            }));
            console.log(b);
            setD(b);
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
          type="number"
          max={10}
          min={1}
          name="choices"
          placeholder="#"
          className="input input-bordered input-primary w-[10%] focus:outline-none"
        />
        <br />
        <br />
        <button type="submit" className="btn mb-5" disabled={pending}>
          get the fucking data
        </button>
        <br />
        {d && (
          <div>
            {d.map((i) => (
              <div key={uid(2)}>
                <p className="font-semibold text-xl">{i.question}</p>
                <div>
                  <ul className="list-disc">
                    {i.choices.map((e) => (
                      <li key={e.id} className="mx-6">
                        <p
                          className={
                            e.correct ? "text-green-600 text-bold" : ""
                          }
                        >
                          {e.choice}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
        <button
          className="btn"
          type="button"
          disabled={d.length === 0 || pending}
          onClick={async () => {
            setPending(true);
            await addToDB({
              name: `${topic} quiz`,
              owner: user?.id as string,
              quizes: d,
            });
            setPending(false);
            setD([]);
            push("/quiz");
          }}
        >
          ADD to db
        </button>
      </form>
    </div>
  );
};

export default FlashcardAIGen;
