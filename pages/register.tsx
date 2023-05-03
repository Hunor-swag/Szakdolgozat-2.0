"use client";

import "../styles/globals.css";
import { useState } from "react";
import { FormTextInput } from "../components/FormTextInput";
import Link from "next/link";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response: Response) => {
      if (response.status !== 200) {
        throw new Error("Error");
      }
      setEmail("");
      setPassword("");
      window.location.href = "/";
    });
  };

  return (
    <div className="bg-gray-700 text-white w-screen h-screen">
      <h1 className="text-center text-3xl font-semibold">Regisztráció</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div>
          <FormTextInput
            inputType="email"
            inputValue={email}
            inputPlaceholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormTextInput
            inputType="password"
            inputValue={password}
            inputPlaceholder="Jelszó"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-between">
            <button className="btn">Regisztráció</button>
            <Link href="/">
              <button className="btn">Belépés</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
