import { getQuiz } from "@/app/libs/quizActions";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import QuizList from "./QuizList";

export default async function ListQuiz() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getQuiz(user?.id as string);
  return <QuizList data={data} />;
}
