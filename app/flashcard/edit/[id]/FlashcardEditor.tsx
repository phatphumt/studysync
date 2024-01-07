"use client";
import {
  IDedFlashcard,
  TheFlashcard,
  updateFlashcard,
} from "@/app/config/flashcardActions";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

/* 

{
  owner: 'qIBMbJVSKvU1BiSQHIsxkXeZV8k2',
  createdAt: Timestamp { seconds: 1702016308, nanoseconds: 506000000 },
  flashcards: [
    { answer: '2', question: '1', id: '387196357a1' },
  ],
  name: 'untitled flashcard',
}

*/

type Props = TheFlashcard & { _id: string };

const FlashcardEditor = ({ flashcards, name, owner, _id }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const { refresh } = useRouter();
  async function tasgas(
    answer: string,
    id: string,
    question: string,
    currIDX: number
  ) {
    let newData: IDedFlashcard[] = [];
    [...flashcards, { answer, id, question }].forEach((e, ine) => {
      if (ine === currIDX) {
        return;
      }
      newData = [...newData, e];
    });
    await updateFlashcard({ flashcards, name, owner }, newData, _id);
  }
  return (
    <div className="p-3 gap-1 flex flex-col w-max">
      {flashcards.map((e, i) => (
        <>
          <button
            key={e.id}
            className="select-none cursor-pointer active:scale-95 transition-all hover:scale-105"
            onClick={() => {
              setCurrent(i);
              modalRef.current?.showModal();
              questionRef.current!.value = flashcards[i].question;
              answerRef.current!.value = flashcards[i].answer;
            }}
          >
            {e.question} | {e.answer}{" "}
          </button>
          <dialog className="modal" ref={modalRef}>
            <div className="modal-box">
              <h3 className="font-bold text-xl">Edit a Flashcard</h3>
              <p className="py-4">
                <input
                  type="text"
                  ref={questionRef}
                  placeholder="question"
                  className="input input-primary input-sm mb-2 w-[80%] focus:outline-none"
                  defaultValue={flashcards[current as number].question}
                />
                <br />
                <input
                  type="text"
                  ref={answerRef}
                  placeholder="answer"
                  defaultValue={flashcards[current as number].answer}
                  className="input input-primary input-sm w-[80%] focus:outline-none"
                />
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    className="btn mx-2"
                    disabled={pending}
                    type="button"
                    onClick={async () => {
                      setPending(true);
                      console.log(
                        questionRef.current?.value,
                        answerRef.current?.value
                      );
                      await tasgas(
                        answerRef.current?.value as string,
                        flashcards[current].id,
                        questionRef.current?.value as string,
                        current
                      );
                      setPending(false);
                      modalRef.current?.close();
                      refresh();
                    }}
                  >
                    Done
                  </button>
                  <button
                    className="btn"
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      questionRef.current!.value = "";
                      answerRef.current!.value = "";
                      modalRef.current?.close();
                    }}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      ))}
    </div>
  );
};

export default FlashcardEditor;
