"use client";

import "../styles/globals.css";
import { useState } from "react";
import FormTextInput from "../components/FormTextInput";

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
      <h1 className="text-center text-3xl font-semibold">Register</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <FormTextInput
          inputType="email"
          inputValue={email}
          inputPlaceholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormTextInput
          inputType="password"
          inputValue={password}
          inputPlaceholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Submit</button>
        <div></div>
      </form>
    </div>
  );
}

export default Register;
