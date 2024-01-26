import { getSession } from "@/app/libs/quizActions";
import Link from "next/link";
import React from "react";
import HistoryCollapse from "./HistoryCollapse";

export default async function QuizHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSession(params.id);
  console.log(`${data[0]._id}`);
  return (
    <div className="p-8">
      {data.length !== 0 ? (
        data.map((e) => (
          <HistoryCollapse
            correct={e.correct}
            createdAt={e.createdAt}
            id={e.id}
            quizes={e.quizes}
            sessionID={e.sessionID}
            updatedAt={e.updatedAt}
            wrong={e.wrong}
            key={e.sessionID}
          />
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
}
