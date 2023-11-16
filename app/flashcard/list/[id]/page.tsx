"use client";

import { db } from "@/app/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";

type Props = {
  params: { id: string };
};

const FlashcardItemPage = ({ params }: Props) => {
  useEffect(() => {
    async function a() {
      try {
        console.log("started fectching");
        const doac = doc(db, "flashcards", params.id);
        const data = await getDoc(doac);
        console.log(data.data());
      } catch (e) {
        console.error(e);
        alert(`error: ${e}`);
      }
    }
    a();
  }, [params.id]);
  return <div>FlashcardItemPage {params.id}</div>;
};

export default FlashcardItemPage;
