"use client";

import { FormEvent, useState, useEffect } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";

import {
  degree_types,
  department_names,
  institution_names,
  uni_roles,
} from "../../../constants";

function AddCommittee() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    name: "",
    gender: "",
    institution_name: "",
    short_institution_name: "",
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
      name: "",
      gender: "",
      institution_name: "",
      short_institution_name: "",
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

    let name = "";
    if (values.degree === "") {
      name = `${values.lastname} ${values.firstname}`;
    } else {
      name = `Dr. ${values.lastname} ${values.firstname}`;
    }

    const fetchData = { ...values, name: name };

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
        <h1 className="text-center text-3xl my-5">Bizottsági tag bevitele</h1>
        <FormTextInput
          inputType="text"
          inputPlaceholder="Vezetéknév"
          inputValue={values.lastname}
          onChange={(e) => setValues({ ...values, lastname: e.target.value })}
        />
        <FormTextInput
          inputType="text"
          inputPlaceholder="Keresztnév"
          inputValue={values.firstname}
          onChange={(e) => setValues({ ...values, firstname: e.target.value })}
        />
        <FormSelectInput
          labelContent="Nem"
          options={["nő", "férfi"]}
          value={values.gender}
          onChange={(e) => setValues({ ...values, gender: e.target.value })}
        />
        <FormSelectInput
          labelContent="Intézmény neve"
          options={institution_names}
          value={values.institution_name}
          onChange={(e) =>
            setValues({ ...values, institution_name: e.target.value })
          }
        />
        <FormTextInput
          inputType="text"
          inputPlaceholder="Intézmény rövid neve"
          inputValue={values.short_institution_name}
          onChange={(e) =>
            setValues({ ...values, short_institution_name: e.target.value })
          }
        />
        <FormSelectInput
          labelContent="Tanszék neve"
          options={department_names}
          value={values.department_name}
          onChange={(e) =>
            setValues({ ...values, department_name: e.target.value })
          }
        />
        <FormSelectInput
          labelContent="Beosztás"
          options={uni_roles}
          value={values.uni_role}
          onChange={(e) => setValues({ ...values, uni_role: e.target.value })}
        />
        <FormSelectInput
          labelContent="Tudományos fokozat"
          options={degree_types}
          value={values.degree}
          onChange={(e) => setValues({ ...values, degree: e.target.value })}
        />

        <div className={`text-semibold ${message?.color}`}>{message.msg}</div>
        <button className="btn" type="submit">
          Hozzáadás
        </button>
      </form>
    </div>
  );
}

export default AddCommittee;
