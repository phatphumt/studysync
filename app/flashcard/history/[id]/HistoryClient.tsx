import React from "react";
import Collapse from "../../../components/util/Collapse";

type Data = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  id: string;
  createdAt: string;
};

type Flaschard = {
  flashcards: { answer: string; question: string; id: string }[];
};

type Props = {
  data: Data;
  flashcard: Flaschard;
};

export default function HistoryClient({ data, flashcard }: Props) {
  return (
    <>
      <Collapse
        head={
          <span className="text-xl font-medium">
            Session {data.sessionID} (
            {(data.correct.length / (data.correct.length + data.wrong.length)) *
              100}
            %)
          </span>
        }
        className="bg-base-200"
      >
        <p>
          created at: {new Date(data.createdAt).toLocaleDateString()}{" "}
          {new Date(data.createdAt).toLocaleTimeString()} (UTC)
        </p>
        <h1 className="font-bold">Correct: </h1>
        {data.correct.length === 0 && <p>no correct answers</p>}
        {data.correct.map((i) => {
          const theData = flashcard.flashcards.find((e) => e.id === i);
          return (
            <div key={i}>
              <p>
                {theData?.question} | {theData?.answer}
              </p>
            </div>
          );
        })}
        <h1 className="font-bold">Wrong: </h1>
        {data.wrong.length === 0 && <p>no wrong answers</p>}
        {data.wrong.map((i) => {
          const theData = flashcard.flashcards.find((e) => e.id === i);
          return (
            <div key={i}>
              <p>
                {theData?.question} | {theData?.answer}
              </p>
            </div>
          );
        })}
      </Collapse>
    </>
  );
}
