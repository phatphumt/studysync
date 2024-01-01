import React from "react";
import Image from "next/image";
import CallToDB from "./CallToDB";

/* type Data = {
  owner: string;
  createdAt: { seconds: number; nanoseconds: number };
  flashcards: [{ answer: string; question: string; id: string }];
  name: string;
}; */

const PlayFlashcard = async ({ params }: { params: { id: string } }) => {
  const initialCatData = await fetch(
    "https://api.thecatapi.com/v1/images/search"
  );
  const catImg: { id: string; url: string; width: number; height: number }[] =
    await initialCatData.json();
  /*  const docc = doc(db, "flashcards", params.id);
  const data = await getDoc(docc);
  const as: Data = data.data() as Data; */
  const as: any = undefined;
  return (
    <div className="flex justify-center items-center h-[91vh] flex-col">
      <h1 className="font-semibold text-3xl">start now!!!</h1>
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
      <CallToDB id={params.id} next={as.flashcards[0].id} />
    </div>
  );
};

export default PlayFlashcard;
