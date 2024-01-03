import FlashcardSchema from "@/app/models/FlashcardSchema";
import FlashcardSessionSchema from "@/app/models/FlashcardSessionSchema";
import { connect } from "mongoose";
import Link from "next/link";
import React from "react";
import { uid } from "uid";
import HistoryClient from "./HistoryClient";

type Data = {
  sessionID: string;
  correct: string[];
  wrong: string[];
  id: string;
  createdAt: string;
};

type Flaschard = {
  flashcards: { answer: string; question: string; id: string }[];
};

const HistoryPage = async ({ params }: { params: { id: string } }) => {
  await connect(process.env.MONGO_URI as string);
  const data: Data[] = await FlashcardSessionSchema.find({ id: params.id });
  const dataata: Flaschard = await FlashcardSchema.findById(params.id) as Flaschard
  console.log(dataata.flashcards)
  return (
    <div className="p-8">
      {data.length !== 0 ? (
        <div>
          {data.map(i => <HistoryClient data={i} flashcard={dataata} key={uid()}/>)}
        </div>
      ) : (
        <p>
          no history: create a history{" "}
          <Link
            className="underline font-medium"
            href={`/flashcard/play/${params.id}`}
          >
            here
          </Link>
        </p>
      )}
    </div>
  );
};

export default HistoryPage;
