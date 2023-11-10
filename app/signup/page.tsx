"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/util/Button";
import Link from "next/link";
import { useAuth } from "../SessionProvider";
import { redirect } from "next/navigation";

type UserCreds = {
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginPage = () => {
  const [credential, setCredential] = useState<UserCreds>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<null | string>(null);
  const user = useAuth();

  useEffect(() => {
    if (user?.user !== null) {
      redirect("/dashboard");
    }
  });

  const handleSignin = async (
    e: React.FormEvent,
    { email, password, confirmPassword }: UserCreds
  ) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    if (confirmPassword !== password) {
      setError("Passwords need to match");
      return;
    }
    console.log("ok");
    setError(null);
    const a = await user?.signUp(email, password).catch((e) => setError(e));
    if (a != null) {
      setError(a);
      return;
    }
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <main className="h-[90vh] flex justify-center items-center flex-col gap-5">
      <h1 className="text-5xl font-bold text-center">Signup</h1>
      <form
        className="flex flex-col gap-5 w-[80vh] items-center"
        onSubmit={(e) => handleSignin(e, credential)}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered input-primary w-full focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered input-primary w-full focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Password Confirmation"
          className="input input-bordered input-primary w-full focus:outline-none"
          onChange={handleChange}
        />
        <Button className="btn-outline w-1/4">Signup</Button>
      </form>
      {error && <p className="font-bold text-red-500">{error}</p>}
      <p>
        Already have an account?{" "}
        <Link href="/signup" className="underline font-medium">
          Login
        </Link>{" "}
        here!
      </p>
    </main>
  );
};

export default LoginPage;
