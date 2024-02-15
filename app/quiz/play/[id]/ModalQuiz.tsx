"use client";
import { DBQuiz, addToDB } from "@/app/libs/quizActions";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function ModalQuiz({
  data,
  currID,
}: {
  data: DBQuiz;
  currID: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => modalRef.current?.showModal()}
          className="btn btn-sm btn-info"
        >
          Details
        </button>
        <button
          className="btn btn-sm btn-success"
          onClick={async () => {
            await addToDB({
              name: data.name,
              owner: currID,
              quizes: data.quizes,
            });
            router.push("/quiz/list");
          }}
        >
          Add to your own libary
        </button>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-3">{data.name} flashcard</h3>
          <ul className="h-56 overflow-y-auto overflow-x-hidden">
            {data.quizes.map((el) => (
              <li key={el.id}>
                <p className="font-semibold">{el.question}</p>
                <div>
                  {el.choices.map((ell) => (
                    <p key={ell.id}>- {ell.choice}</p>
                  ))}
                </div>
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
