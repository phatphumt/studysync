"use client";

import { useAuth } from "@/app/SessionProvider";
import { db } from "@/app/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const ListFlashcard = () => {
  const auth = useAuth();
  const [dt, setDt] = useState<undefined | any[]>();

  useEffect(() => {
    async function a() {
      try {
				if (!auth?.user?.uid) {
					return;
				}
				const uid: string = auth?.user?.uid;
        const q = query(collection(db, "/flaschards"), where("owner", "==", uid));
        const data = await getDocs(q);
        const acutualData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(acutualData);
        setDt(acutualData);
				console.log('no error')
      } catch (e) {
        console.error(e);
      }
    }
    a();
  }, [auth?.user?.uid]);
	
  return (
    <div className="p-10">
      {dt &&
        dt.map((i: any) => (
          <div key={i.id}>
            <span className="font-bold text-xl">Flashcard ({i.name})</span>
            <br />
            {i.flashcards.map((i: any, ia: number) => (
              <div key={i.question}>
                {ia + 1} - {i.question} | {i.answer}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ListFlashcard;
