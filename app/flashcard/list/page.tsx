"use client";

import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import useCheckCredentials from "@/app/useCheckCredentials";
import { data } from "autoprefixer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListFlashcard = () => {
  useCheckCredentials("/flashcard/list");
  const auth = useAuth();
  const [dt, setDt] = useState<undefined | any[] | null>(undefined);

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
        setDt(null);
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

  return (
    <div className="p-10">
      {dt ? (
        dt.map((i: any) => (
          <div key={i.id}>
            <span className="font-bold text-2xl">Flashcard ({i.name})</span>
            {"       "}
            <span
              className="text-red-600 font-bold cursor-pointer select-none"
              onClick={() => deleteData(i.id)}
            >
              del{"  "}
            </span>
            |
            <Link
              className="text-green-700 font-bold cursor-pointer select-none"
              href={`/flashcard/edit/${i.id}`}
            >
              {"  "}edit{"  "}
            </Link>
            <br />
            <span>
              Created at:
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleDateString()}
              {"  "}
              {new Date(i.createdAt.seconds * 1000).toLocaleTimeString()}
            </span>
            <br />
            <Link
              href={`/flashcard/play/${i.id}`}
              className="text-xl font-semibold"
            >
              PLAY NOW!!!
            </Link>
          </div>
        ))
      ) : data === null ? (
        <p>You have no flashcards</p>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ListFlashcard;
