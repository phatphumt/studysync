"use client";
import Link from "next/link";
import React from "react";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <span className="btn btn-ghost normal-case text-2xl">
          <Link href="/">StudySync</Link>
        </span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            {!isAuthenticated ? (
              <LoginLink>Login</LoginLink>
            ) : (
              <details>
                <summary>
                  <Link href="/dashboard">{user?.email}</Link>
                </summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <LogoutLink>Sign Out</LogoutLink>
                  </li>
                </ul>
              </details>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
