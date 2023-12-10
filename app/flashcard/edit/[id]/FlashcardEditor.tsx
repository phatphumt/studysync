"use client";
import React from "react";

/* 

{
  owner: 'qIBMbJVSKvU1BiSQHIsxkXeZV8k2',
  createdAt: Timestamp { seconds: 1702016308, nanoseconds: 506000000 },
  flashcards: [
    { answer: '2', question: '1', id: '387196357a1' },
  ],
  name: 'untitled flashcard',
}

*/

type Props = {
  owner: string;
  createdAt: { seconds: number; nanoseconds: number };
  flashcards: [{ answer: string; question: string; id: string }];
  name: string;
};

const FlashcardEditor = ({ flashcards }: Props) => {
  // const [dat, setDat] = useState(flashcards)
  return (
    <div className="p-3">
      {flashcards.map((i) => (
        <div key={i.id} className="pb-3">
          <label htmlFor="question">Question: </label>
          <input
            type="text"
            defaultValue={i.question}
            id="question"
            className="input input-bordered input-primary input-xs mr-2"
          />
          <label htmlFor="answer">Answer: </label>
          <input
            type="text"
            defaultValue={i.answer}
            id="answer"
            className="input input-bordered input-primary input-xs mr-2"
          />
          {i.question} | {i.answer}
        </div>
      ))}
      <button className="btn btn-outlined btn-primary">Submit</button>
    </div>
  );
};

export default FlashcardEditor;
