"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import HeaderItem from "../components/HeaderItem";
import Signout from "../components/Signout";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <header className="flex justify-end space-x-5 p-5 border-b-2">
            <HeaderItem href="admin" text="Admin" />
            <Signout />
          </header>
          <h1 className="text-center my-5 text-3xl font-semibold">
            Welcome to the homepage
          </h1>
        </div>
      ) : (
        <h1>No session :(</h1>
      )}
    </div>
  );
};

export default HomePage;
