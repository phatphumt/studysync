import React from "react";
import Image from "next/image";
import CallToDB from "./CallToDB";
import FlashcardSchema from "@/app/models/FlashcardSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ModalList from "./ModalList";
import { TheFlashcard } from "@/app/libs/flashcardActions";

type Data = {
  _id: string;
  createdAt: string;
} & TheFlashcard;

const PlayFlashcard = async ({ params }: { params: { id: string } }) => {
  const initialCatData = await fetch(
    "https://api.thecatapi.com/v1/images/search",
    { cache: "no-store" }
  );
  const a = getKindeServerSession();
  const b = await a.getUser();
  const catImg: { id: string; url: string; width: number; height: number }[] =
    await initialCatData.json();
  /*  const docc = doc(db, "flashcards", params.id);
  const data = await getDoc(docc);
  const as: Data = data.data() as Data; */
  const as: Data = (await FlashcardSchema.findById(params.id)) as Data;
  return (
    <div className="flex justify-center items-center h-[91vh] flex-col">
      <h1 className="font-semibold text-3xl">
        {b?.id !== as.owner ? "importing flashcard" : "start now"}
      </h1>
      <p>Flashcard name: {as.name}</p>
      <p className="pb-3"># of questions: {as.flashcards.length}</p>
      {catImg.map((i) => {
        return (
          <Image
            className="pb-3"
            src={i.url}
            key={i.id}
            width={i.width / 3}
            height={i.height / 3}
            alt="cat imgs"
          />
        );
      })}
      {b?.id === as.owner ? (
        <CallToDB id={params.id} data={as} />
      ) : (
        <div className="flex flex-col space-y-2">
          <ModalList data={as} currID={b?.id as string} />
        </div>
      )}
    </div>
  );
};

export default PlayFlashcard;
