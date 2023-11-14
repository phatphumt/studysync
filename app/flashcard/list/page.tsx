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
import React, { useEffect, useState } from "react";

const ListFlashcard = () => {
  useCheckCredentials("/flashcard/list");
  const auth = useAuth();
  const [dt, setDt] = useState<undefined | any[]>();

  useEffect(() => {
    async function a() {
      try {
        if (!auth?.user?.uid) {
          throw new Error("user id cannot be null or undefiend");
        }
        const uid: string = auth?.user?.uid;
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
    a();
  }, [auth?.user?.uid, dt]);

  async function deleteData(id: string) {
    await deleteDoc(doc(db, "flashcards", id));
    setDt(undefined);
  }
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
            <span className="text-green-700 font-bold cursor-pointer select-none">
              {"  "}edit{"  "}
            </span>
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
          </div>
        ))
      ) : (
        <p>You have no flashcards</p>
      )}
    </div>
  );
};

export default ListFlashcard;
