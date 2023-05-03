"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-red-500 border-2 p-5 flex flex-col bg-gray-700">
        <h1 className="text-5xl m-5">Bejelentkezés</h1>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => signIn("google")}
            className="border border-black flex-1 rounded-md bg-red-300 ml-5 mr-5 px-5"
          >
            Email címmel
          </button>
          <Link href="/register">
            <button className="border border-black flex-1 rounded-md bg-red-300 ml-5 mr-5 px-5">
              Regisztráció
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
