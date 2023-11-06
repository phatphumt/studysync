"use client";
import useCheckCredentials from "@/app/useCheckCredentials";
import { useRouter } from "next/navigation";
import React from "react";

const NewFlashcard = () => {
  useCheckCredentials();
  const r = useRouter();
  return (
    <div className="p-10">
      <button
        className="btn font-bold"
        onClick={() => r.push("/flashcard/new/ai")}
      >
        AI
      </button>
      <br />
      <br />
      <button
        className="btn font-bold"
        onClick={() => r.push("/flashcard/new/human")}
      >
        Human
      </button>
    </div>
  );
};

export default NewFlashcard;
