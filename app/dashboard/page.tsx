import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const loggedIn = await isAuthenticated();
  const user = await getUser();
  if (!loggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <div className="m-10">
        hello, {user?.email}{" "}
        {user?.picture ? (
          <Image
            src={user?.picture as string}
            alt="pfp"
            width={25}
            height={25}
          />
        ) : null}
        <p>Dashboard is WIP</p>
        <p className="text-lg font-bold">Features: </p>
        <ul className="list-disc mx-5">
          <li>
            <Link href="/flashcard">Flashcard</Link>
          </li>
          <li>
            <Link href="/timer">Timer</Link>
          </li>
          <li>
            <Link href="/timer">Quiz</Link>
          </li>
          <li>
            <LogoutLink>Logout</LogoutLink>
          </li>
        </ul>
      </div>
    </>
  );
}
