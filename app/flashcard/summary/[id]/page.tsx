"use client";
import { addSessionToDB } from "@/app/actions/flashcardActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Dataa = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  flashcards: { answer: string; question: string; id: string }[];
  id: string;
};

const SummaryPage = () => {
  const [data, setData] = useState<Dataa | null>(null);
  useEffect(() => {
    const savedData = localStorage.getItem("hello");

    if (!savedData) {
      // No data found in localStorage
      setData(null);
      return;
    }

    const parsedData: Dataa = JSON.parse(savedData);
    setData(parsedData);

    async function fetchData(savingData: Dataa) {
      try {
        await addSessionToDB(savingData);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData(parsedData);
    localStorage.removeItem("hello");
  }, []);

  return (
    <div className="flex h-[90vh] justify-center items-center flex-col text-center">
      <h1 className="font-bold text-3xl">Summary</h1>
      {data ? (
        <div>
          <p>correct: {data.correct.length}</p>
          <p>wrong: {data.wrong.length}</p>
        </div>
      ) : (
        <div>null</div>
      )}
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
      <Link href="/flashcard/list">
        <button className="btn btn-success btn-xs">Done</button>
      </Link>
    </div>
  );
};

export default SummaryPage;
