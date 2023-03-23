"use client";

import { FormEvent, useEffect, useState } from "react";
import FormSelectInput from "../../../components/FormSelectInput";

function EditPermissions() {
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState("");
  const [selected, setSelected] = useState("User");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO: Add logic to update user role
    e.preventDefault();
  };

  return (
    <form className="flex flex-col" onSubmit={(e) => handleSubmit}>
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
      <button className="btn self-center" type="submit">
        Submit
      </button>
    </form>
  );
}

export default EditPermissions;
