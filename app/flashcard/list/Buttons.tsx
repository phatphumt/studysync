"use client";
import { deleteItem } from "@/app/libs/flashcardActions";
import { useRouter } from "next/navigation";
import React from "react";

const Buttons = ({ id, modalEvent }: { id: string, modalEvent: () => void }) => {
  
  const { refresh, push } = useRouter();
  return (
    <>
      <button
        className="text-red-600 font-bold cursor-pointer select-none"
        onClick={async () => {
          await deleteItem(id);
          refresh();
        }}
      >
        <span className="material-icons-outlined">delete</span>
      </button>
      <button
        className="text-green-600 font-bold cursor-pointer select-none"
        onClick={() => {
          push(`/flashcard/edit/${id}`);
        }}
      >
        <span className="material-icons-outlined">edit</span>
      </button>
      <button
        className="text-blue-600 font-bold cursor-pointer select-none"
        onClick={() => {
          modalEvent()
        }}
      >
        <span className="material-icons-outlined">ios_share</span>
      </button>
        
    </>
  );
};

export default Buttons;
