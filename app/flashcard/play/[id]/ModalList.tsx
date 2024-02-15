"use client";

import { TheFlashcard, addToDB } from "@/app/libs/flashcardActions";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function ModalList({
  data,
  currID,
}: {
  data: TheFlashcard;
  currID: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn btn-sm btn-info"
      >
        Details
      </button>
      <button
        className="btn btn-sm btn-success"
        onClick={async () => {
          await addToDB(data.flashcards, currID, data.name);
          router.push("/flashcard/list");
        }}
      >
        Add to your own libary
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-3">{data.name} flashcard</h3>
          <ul className="h-56 overflow-y-auto overflow-x-hidden">
            {data.flashcards.map((el) => (
              <li key={el.id}>
                <p className="font-semibold">{el.question}</p>
                <p className="ml-1">- {el.answer}</p>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
