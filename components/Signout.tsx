"use client";

import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <div className="flex-end">
      <button
        className="btn bg-red-500 hover:bg-red-400"
        onClick={() => signOut()}
      >
        Signout
      </button>
    </div>
  );
};

export default Signout;
