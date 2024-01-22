"use client";
import { QuizSession } from "@/app/actions/quizActions";
import React, { useEffect, useState } from "react";

export default function SummaryPage() {
  const [data, setData] = useState<QuizSession>();
  useEffect(() => {
    const savedData = localStorage.getItem("hello");

    if (!savedData) {
      // No data found in localStorage
      /* setData(null); */
      return;
    }

    const parsedData = JSON.parse(savedData);
    setData(parsedData);
    localStorage.removeItem("hello");
  }, []);
  return (
    <div className="flex h-[91vh] items-center justify-center flex-col">
      {data?.correct.length} / {data?.wrong.length}
    </div>
  );
}
