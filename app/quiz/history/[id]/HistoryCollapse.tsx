"use client";
import { QuizSession } from "@/app/libs/quizActions";
import Collapse from "@/app/components/util/Collapse";
import React from "react";

export default function HistoryCollapse({
  sessionID,
  createdAt,
  correct,
  wrong,
  quizes,
}: QuizSession & { createdAt: string; updatedAt: string }) {
  return (
    <>
      <Collapse
        head={
          <span className="text-xl font-medium">
            Session {sessionID} (
            {(correct.length / (correct.length + wrong.length)) * 100}
            %)
          </span>
        }
        className="bg-base-200 mb-2"
      >
        <p>
          created at: {new Date(createdAt).toLocaleDateString()}{" "}
          {new Date(createdAt).toLocaleTimeString()} (UTC)
        </p>
        <h1 className="font-bold text-xl">Correct: </h1>
        {correct.length === 0 && <p>no correct answers</p>}
        {correct.map((i) => {
          const theData = quizes.find((e) => e.id === i.quizID);
          return (
            <div key={i.quizID} className="space-x-3">
              <h2 className="font-semibold text-lg">{theData?.question}</h2>
              {theData?.choices.map((e) => {
                return (
                  <span
                    key={e.id}
                    className={e.correct ? "text-green-700 font-medium" : ""}
                  >
                    {e.choice}
                  </span>
                );
              })}
              <hr />
            </div>
          );
        })}
        <h1 className="font-bold text-xl">Wrong: </h1>
        {wrong.length === 0 && <p>no wrong answers</p>}
        {wrong.map((i) => {
          const theData = quizes.find((e) => e.id === i.quizID);
          return (
            <div key={i.quizID} className="space-x-3">
              <h2 className="font-semibold text-lg">{theData?.question}</h2>
              {theData?.choices.map((e) => (
                <span
                  key={e.id}
                  className={
                    e.correct
                      ? "text-green-700 font-medium"
                      : i.answeredID === e.id
                      ? "text-red-700 font-medium"
                      : ""
                  }
                >
                  {e.choice}
                </span>
              ))}
              <hr />
            </div>
          );
        })}
      </Collapse>
    </>
  );
}
