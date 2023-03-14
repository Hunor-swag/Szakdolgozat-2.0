"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-red-500 border-2 p-5 flex flex-col bg-gray-700">
        <h1 className="text-5xl m-5">Login please</h1>
        <button
          onClick={() => signIn("google")}
          className="border border-black flex-1 rounded-md bg-red-300 ml-5 mr-5"
        >
          Sign in with credentials
        </button>
      </div>
    </div>
  );
};

export default Login;
