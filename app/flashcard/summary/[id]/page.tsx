"use client";
import React, { useEffect, useState } from "react";

type Dataa = {
  sessionID: string;
  correct: number;
  wrong: number;
  flashcards: { answer: string; question: string; id: string }[];
  id: string;
};

const SummaryPage = () => {
  const [data, setData] = useState<Dataa | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("hello");
    if (!data) {
      setData(null);
    }
    setData(JSON.parse(data as string));
  }, []);
  return (
    <>
      {data ? <div>
        <p>correct: {data.correct}</p>
        <p>wrong: {data.wrong}</p>
      </div> : <div>null</div>}
      <button
        className="btn m-3"
        onClick={() => {
          const data = localStorage.getItem("hello");
          if (!data) {
            console.log("null");
            return;
          }
          console.log(JSON.parse(data as string));
        }}
      >
        get localStorage data
      </button>
    </>
  );
};

export default SummaryPage;
