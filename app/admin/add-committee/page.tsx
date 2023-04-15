"use client";

import { FormEvent, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";

import {
  degree_types,
  department_names,
  institution_names,
  uni_roles,
} from "../../../constants";

// bizottsági tagoknak több mező (lásd a személy hozzáadásánál)

function AddCommittee() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    institution_name: "",
    department_name: "",
    uni_role: "",
    degree: "",
  });

  const [message, setMessage] = useState({
    msg: "",
    color: "",
  });

  const validateForm = () => {
    if (
      values.firstname === "" ||
      values.lastname === "" ||
      values.institution_name === "" ||
      values.department_name === "" ||
      values.uni_role === ""
    ) {
      displayMessage("Minden mező kitöltése kötelező!", "text-red-500");
      return false;
    }
    return true;
  };

  const resetData = () => {
    setValues({
      firstname: "",
      lastname: "",
      gender: "",
      institution_name: "",
      department_name: "",
      uni_role: "",
      degree: "",
    });
  };

  const displayMessage = (msg: string, color: string) => {
    setMessage({ msg: msg, color: color });
    setTimeout(() => {
      setMessage({ msg: "", color: "" });
    }, 5000);
  };

  const sendData = async () => {
    if (!validateForm()) return;

    const fetchData = { ...values };

    await fetch("http://localhost:3000/api/addCommittee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    })
      .then((response: Response) => {
        displayMessage("Személy sikeresen hozzáadva!", "text-green-500");

        resetData();
      })
      .catch((err) => {
        displayMessage(
          "Hiba történt a személy hozzáadása közben!",
          "text-red-500"
        );
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendData();
  };

  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit} className="lg:w-1/3 md:w-3/4 flex flex-col">
        <h1 className="text-center text-3xl my-5">Add committee</h1>
        <FormTextInput
          inputType="text"
          inputPlaceholder="First name"
          inputValue={values.firstname}
          onChange={(e) => setValues({ ...values, firstname: e.target.value })}
        />
        <FormTextInput
          inputType="text"
          inputPlaceholder="Last name"
          inputValue={values.lastname}
          onChange={(e) => setValues({ ...values, lastname: e.target.value })}
        />
        <FormSelectInput
          labelContent="Gender"
          options={["nő", "férfi"]}
          value={values.gender}
          onChange={(e) => setValues({ ...values, gender: e.target.value })}
        />
        <FormSelectInput
          labelContent="Name of institution"
          options={institution_names}
          value={values.institution_name}
          onChange={(e) =>
            setValues({ ...values, institution_name: e.target.value })
          }
        />
        <FormSelectInput
          labelContent="Name of department"
          options={department_names}
          value={values.department_name}
          onChange={(e) =>
            setValues({ ...values, department_name: e.target.value })
          }
        />
        <FormSelectInput
          labelContent="Rank"
          options={uni_roles}
          value={values.uni_role}
          onChange={(e) => setValues({ ...values, uni_role: e.target.value })}
        />
        <FormSelectInput
          labelContent="Degree"
          options={degree_types}
          value={values.degree}
          onChange={(e) => setValues({ ...values, degree: e.target.value })}
        />

        <div className={`text-semibold ${message?.color}`}>{message.msg}</div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCommittee;
