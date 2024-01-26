"use client";
import { QuizSession, addSessionToDB } from "@/app/libs/quizActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SummaryPage() {
  const [data, setData] = useState<QuizSession | null>(null);
  const { push } = useRouter();
  useEffect(() => {
    const savedData = localStorage.getItem("currentQuiz");

    if (!savedData) {
      // No data found in localStorage
      setData(null);
      push("/quiz/list");
      return;
    }

    const parsedData = JSON.parse(savedData);
    setData(parsedData);
    localStorage.removeItem("currentQuiz");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-[91vh] items-center justify-center flex-col">
      correct: {data?.correct.length} / wrong: {data?.wrong.length}
      <Link
        href={`/quiz/list`}
        onClick={async () => {
          await addSessionToDB(data);
        }}
      >
        Done
      </Link>
    </div>
  );
}
