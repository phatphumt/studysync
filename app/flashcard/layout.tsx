import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connect } from "mongoose";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  await connect(process.env.MONGO_URI as string);
  return <>{children}</>;
}
