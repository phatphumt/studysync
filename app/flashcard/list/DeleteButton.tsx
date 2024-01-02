"use client";
import { deleteItem } from "@/app/config/flashcardActions";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const { refresh } = useRouter();
  return (
    <button
      className="text-red-600 font-bold cursor-pointer select-none"
      onClick={async () => {
        await deleteItem(id);
        refresh();
      }}
    >
      <span className="material-icons-outlined">delete</span>
    </button>
  );
};

export default DeleteButton;
