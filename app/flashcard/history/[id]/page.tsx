import FlashcardSessionSchema from "@/app/models/FlashcardSessionSchema";
import { connect } from "mongoose";
import Link from "next/link";
import React from "react";
import { uid } from "uid";

type Data = {
  sessionID: string;
  correct: number;
  wrong: number;
  id: string;
  createdAt: string;
};

const HistoryPage = async ({ params }: { params: { id: string } }) => {
  await connect(process.env.MONGO_URI as string);
  const data: Data[] = await FlashcardSessionSchema.find({ id: params.id });
  return (
    <div className="p-8">
      {data.length !== 0 ? (
        data.map((i) => (
          <div key={uid()}>
            <h1 className="text-2xl font-semibold">Session {i.sessionID}</h1>
            correct: {i.correct}
            {"   "}
            wrong: {i.wrong}
            {"  "}({(i.correct / (i.correct + i.wrong)) * 100}%)
            <br />
            {new Date(i.createdAt).toLocaleDateString()}{" "}
            {new Date(i.createdAt).toLocaleTimeString()}
          </div>
        ))
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
