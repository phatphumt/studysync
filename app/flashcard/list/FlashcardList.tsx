"use client";
import React, { useRef, useState } from "react";
import { Data } from "./page";
import Link from "next/link";
import Buttons from "./Buttons";

export default function FlashcardList({ data }: { data: Data[] }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [id, setID] = useState<string>("");
  return (
    <div className="p-10">
      {data.length !== 0 ? (
        data.map((i) => (
          <div key={i._id}>
            <span className="font-bold text-2xl">Flashcard ({i.name})</span>
            {"       "}
            <Buttons
              id={`${i._id}`}
              modalEvent={() => {
                setID(i._id);
                modalRef.current?.showModal();
              }}
            />
            {"  "}
            <p>
              Created At: {new Date(i.createdAt).toLocaleDateString()}{" "}
              {new Date(i.createdAt).toLocaleTimeString()}
            </p>
            <Link href={`/flashcard/history/${i._id}`}>
              View your history here
            </Link>
            <br />
            <Link
              href={`/flashcard/play/${i._id}`}
              className="text-xl font-semibold"
            >
              PLAY NOW!!!
            </Link>
            <br />
          </div>
        ))
      ) : (
        <p>You have no flashcards</p>
      )}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl">Share</h3>
          <div className="py-4 flex flex-col">
            <span className="text-md font-medium mb-1">
              Share your flashcard with this link:
            </span>{" "}
            <br />
            <span className="bg-gray-300 p-1 overflow-x-scroll font-mono text-sm">
              https://studysync-nsc.vercel.app/flaschard/play/{id}
            </span>
          </div>
        </div>
      </dialog>
    </div>
  );
}
