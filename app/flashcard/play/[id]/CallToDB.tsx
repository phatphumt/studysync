"use client";
import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import * as uuid from "uid";

type Data = {
  flashcards: { answer: string; question: string; id: string }[];
  owner: string;
  name: string;
  createdAt: { seconds: number; nanoseconds: number };
};

const CallToDB = ({ id }: { id: string; next: any }) => {
  const sessionID = uuid.uid(15);
  const auth = useAuth();
  const [url, setUrl] = useState("");
  async function click() {
    const docData = {
      owner: auth?.user?.uid,
      timePlayed: serverTimestamp(),
      flashcard: id,
    };
    await setDoc(doc(db, "flashcards-stats", sessionID), docData);

    const docc = doc(db, "flashcards", id);
    const dataa = await getDoc(docc);
    const theFlashcards = dataa.data() as Data;
    const localStorageData = theFlashcards.flashcards;
    const data = {
      sessionID,
      correct: 0,
      wrong: 0,
      flashcards: localStorageData,
      id,
    };
    setUrl(localStorageData[0].id);
    localStorage.setItem("hello", JSON.stringify(data));
  }
  return (
    <>
      <Link href={`/flashcard/play/${id}/${url}`}>
        <button className="btn btn-primary btn-outline" onClick={click}>
          add
        </button>
      </Link>
    </>
  );
};

export default CallToDB;
