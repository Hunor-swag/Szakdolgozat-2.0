"use client";

import { FormEvent, useEffect, useState } from "react";
import FormSelectInput from "../../../components/FormSelectInput";

function EditPermissions() {
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState("");
  const [selected, setSelected] = useState("User");
  const [message, setMessage] = useState({
    msg: "",
    color: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      await fetch("http://localhost:3000/api/users")
        .then((res) => res.json())
        .then((data) => {
          let usersData: string[] = data.map((user: any) => {
            return user.email;
          });
          setUsers(usersData);
        });
    };
    getUsers();
  }, []);

  const sendData = async () => {
    await fetch("http://localhost:3000/api/updateRole", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, role: selected.toLowerCase() }),
    })
      .then(() => {
        setMessage({ msg: "Sikeres módosítás!", color: "text-green-500" });
        setTimeout(() => {
          setMessage({ msg: "", color: "" });
        }, 5000);
      })
      .catch(() => {
        setMessage({
          msg: "Hiba történt a módosítás közben!",
          color: "text-red-500",
        });
        setTimeout(() => {
          setMessage({ msg: "", color: "" });
        });
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendData();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FormSelectInput
        labelContent="User:"
        onChange={(e) => {
          setUser(e.target.value);
        }}
        options={users}
      />
      <FormSelectInput
        labelContent="Role:"
        onChange={(e) => {
          setSelected(e.target.value);
        }}
        options={["User", "Admin"]}
      />
      <div className={`text-center font-semibold ${message.color}`}>
        {message.msg}
      </div>
      <button className="btn self-center" type="submit">
        Submit
      </button>
    </form>
  );
}

export default EditPermissions;
