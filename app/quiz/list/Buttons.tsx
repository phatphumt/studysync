"use client";

import { removeQuiz } from "@/app/libs/quizActions";
import { useRouter } from "next/navigation";
import React from "react";

export default function Buttons({
  id,
  modalEvent,
}: {
  id: string;
  modalEvent: () => void;
}) {
  const router = useRouter();
  return (
    <div className="">
      <button
        className="text-red-600 font-bold cursor-pointer select-none"
        onClick={async () => {
          await removeQuiz(id);
          router.refresh();
        }}
      >
        <span className="material-icons-outlined">delete</span>
      </button>
      <button
        onClick={() => modalEvent()}
        className="text-blue-600 font-bold cursor-pointer select-none"
      >
        <span className="material-icons-outlined">ios_share</span>
      </button>
    </div>
  );
}
