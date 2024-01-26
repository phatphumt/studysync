import { getQuiz } from "@/app/libs/quizActions";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function ListQuiz() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getQuiz(user?.id as string);
  return (
    <div className="p-10">
      {data.length !== 0 ? (
        data.map((i) => (
          <div key={i._id}>
            <span className="font-bold text-2xl">Flashcard ({i.name})</span>
            {"       "}
            <button className="text-red-600 font-bold cursor-pointer select-none">
              <span className="material-icons-outlined">delete</span>
            </button>
            <button className="text-green-600 font-bold cursor-pointer select-none">
              <span className="material-icons-outlined">edit</span>
            </button>
            {"  "}
            <p>
              Created At: {new Date(i.createdAt).toLocaleDateString()}{" "}
              {new Date(i.createdAt).toLocaleTimeString()}
            </p>
            <Link href={`/quiz/history/${i._id}`}>View your history here</Link>
            <br />
            <Link
              href={`/quiz/play/${i._id}`}
              className="text-xl font-semibold"
            >
              PLAY NOW!!!
            </Link>
            <br />
          </div>
        ))
      ) : (
        <p>You have no quizes</p>
      )}
    </div>
  );
}
