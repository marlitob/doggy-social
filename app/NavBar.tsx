"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-cyan-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {session && session.user && (
              <>
                <li>
                  <Link href={`/users/${session.user.id}`}>Profile</Link>
                </li>
                <li>
                  <Link href={`/post/${session.user.id}`}>Post</Link>
                </li>
                <li>
                  <Link href={`/friendship/${session.user.id}`}>Friends</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Doggy Social</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {session && session.user && (
            <>
              <li>
                <Link href={`/users/${session.user.id}`}>Profile</Link>
              </li>
              <li>
                <Link href={`/post/${session.user.id}`}>Post</Link>
              </li>
              <li>
                <Link href={`/friendship/${session.user.id}`}>Friends</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {status === "authenticated" && (
        <div className="navbar-end">
          <Link href="/api/auth/signout" className="btn">
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
