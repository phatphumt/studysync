import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewFlashcard = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <div className="p-10">
      <Link className="font-bold" href="/flashcard/new/ai">
        AI
      </Link>
      <br />
      <br />
      <Link className="font-bold" href="/flashcard/new/human">
        Human
      </Link>
    </div>
  );
};

export default NewFlashcard;
