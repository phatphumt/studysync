import React from "react";
/* import { doc, getDoc } from "firebase/firestore";
import FlashcardEditor from "./FlashcardEditor"; */
import { getFlashcard } from "@/app/libs/flashcardActions";
import FlashcardEditor from "./FlashcardEditor";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const data = await getFlashcard(params.id);
  return (
    <>
      <FlashcardEditor
        flashcards={data.flashcards}
        name={data.name}
        owner={data.owner}
        _id={params.id}
      />
    </>
  );
};

export default EditPage;
