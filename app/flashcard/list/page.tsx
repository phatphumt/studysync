"use client";

import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import useCheckCredentials from "@/app/useCheckCredentials";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ListFlashcard = () => {
  useCheckCredentials("/flashcard/list");
  const auth = useAuth();
  const [dt, setDt] = useState<undefined | any[]>();
  // const [editing, setEditing] = useState(true);

  const modalRef = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  async function getFromDB(userId: string | undefined) {
    try {
      console.log("started fectching");
      if (!userId) {
        throw new Error("user id cannot be null or undefiend");
      }
      const uid: string = userId;
      const data = await getDocs(
        query(collection(db, "/flashcards"), where("owner", "==", uid))
      );
      const acutualData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (acutualData.length < 1) {
        setDt(undefined);
        return;
      }
      (acutualData as any[]).sort((a, b) =>
        a.createdAt.seconds > b.createdAt.seconds ? -1 : 1
      );
      setDt(acutualData);
    } catch (e) {
      console.error(e);
      alert(`error: ${e}`);
    }
  }

  useEffect(() => {
    getFromDB(auth?.user?.uid);
  }, [auth?.user?.uid]);

  async function deleteData(id: string) {
    await deleteDoc(doc(db, "flashcards", id));
    getFromDB(auth?.user?.uid);
  }

  /* async function updateData(id: string) {
    await updateDoc(doc(db, "flashcards", id), {});
  } */

  return (
    <div className="p-10">
      {dt ? (
        dt.map((i: any) => (
          <div key={i.id}>
            <span className="font-bold text-xl">Flashcard ({i.name})</span>
            {"  "}
            <span
              className="text-red-600 font-bold cursor-pointer select-none"
              onClick={() => deleteData(i.id)}
            >
              del{"  "}
            </span>
            |
            <Link
              className="text-green-700 font-bold cursor-pointer select-none"
              href={`/flashcard/list/${i.id}`}
            >
              {"  "}edit{"  "}
            </Link>
            <br />
            <span>
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleDateString()}
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleTimeString()}
            </span>
            {i.flashcards.map((i: any, ia: number) => (
              <div key={i.question}>
                {ia + 1} - {i.question} | {i.answer}
              </div>
            ))}
            <button onClick={handleShow}>show the fucking modal</button>
            <dialog ref={modalRef} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-2xl">
                  Edit flashcard - {i.name}
                </h3>
                  {i.flashcards.map((i: any, ia: number) => (
                    <div key={ia} className="my-1 mb-">
                      <div>
                        question:{"    "}
                        <input
                          type="text"
                          defaultValue={i.question}
                          className="input input-xs input-bordered input-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        answer:{"    "}
                        <input
                          type="text"
                          defaultValue={i.answer}
                          className="input input-xs input-bordered input-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn mx-3 btn-secondary" type="button">
                      Save
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        if (confirm("close this shit?"))
                          modalRef.current?.close();
                      }}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))
      ) : (
        <p>You have no flashcards</p>
      )}
    </div>
  );
};

export default ListFlashcard;
