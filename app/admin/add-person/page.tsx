"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, MouseEvent, useState, useEffect, ChangeEvent } from "react";
import CustomDatePicker from "../../../components/CustomDatePicker";
import { FormRadioInput } from "../../../components/FormRadioInput";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";
import { RadioButton } from "../../../components/RadioButton";
import {
  degree_types,
  department_names,
  faculty_names,
  institution_names,
  uni_roles,
} from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { Consultant } from "../../../types/typings";

function AddPerson() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [role, setRole] = useState(0);

  const [consultantValues, setConsultantValues] = useState({
    institution_name: "",
    faculty_name: "",
    department_name: "",
    title: "",
    uni_role: "",
    degree: "",
  });

  const [selectedFinance, setSelectedFinance] = useState("");

  useEffect(() => {
    setStudentValues((prevState) => {
      return {
        ...prevState,
        financing: selectedFinance,
      };
    });
  }, [selectedFinance]);

  const [studentValues, setStudentValues] = useState({
    birth_date: new Date(Date.now()),
    consultant1: {} as Consultant | null | undefined,
    consultant2: {} as Consultant | null | undefined,
    topic: "",
    financing: "",
    faculty: "",
    date_of_admission: new Date(Date.now()),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const { data: consultants, error } = useFetch("/api/consultants");

  // if (error) {
  //   return <div>Hiba történt az oldal betöltésekor</div>;
  // }

  const handleBirthDateChange = (date: Date, name: string) => {
    setStudentValues((prevStudentValues) => {
      return {
        ...prevStudentValues,
        [name]: date,
      };
    });
  };

  const fetchData = async () => {
    let fetchData;
    if (role === 1) {
      fetchData = {
        ...values,
        name:
          consultantValues.degree === ""
            ? values.firstname + " " + values.lastname
            : "Dr. " + values.lastname + " " + values.firstname,
        tablename: "consultants",
        role: "consultant",
        institution_name: consultantValues.institution_name,
        faculty_name: consultantValues.faculty_name,
        department_name: consultantValues.department_name,
        title: consultantValues.title,
        uni_role: consultantValues.uni_role,
        degree: consultantValues.degree,
      };
    }
    if (role === 2 || role === 3) {
      fetchData = {
        ...values,
        name: values.lastname + " " + values.firstname,
        role: "student",
        tablename: "students",
        birth_date: studentValues.birth_date,
        consultant1: studentValues.consultant1,
        consultant2: studentValues.consultant2
          ? studentValues.consultant2
          : null,
        topic: studentValues.topic,
        faculty_name: studentValues.faculty,
        financing:
          selectedFinance === "Other"
            ? studentValues.financing
            : selectedFinance,
        date_of_admission: studentValues.date_of_admission,
        individual_prep: role === 3,
      };
    }

    const rawData = await fetch("http://localhost:3000/api/addPerson", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    }).then((response: Response) => {
      setSuccessMessage("Személy sikeresen hozzáadva!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(role);
    console.log(values);
    console.log(studentValues);
    console.log(selectedFinance);
    if (!validateForm()) {
      setErrorMessage("Minden mező kitöltése kötelező!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    await fetchData();

    resetForm();
  };

  const resetForm = () => {
    setValues({ firstname: "", lastname: "", email: "" });
    setConsultantValues({
      institution_name: "",
      faculty_name: "",
      department_name: "",
      title: "",
      uni_role: "",
      degree: "",
    });
    setStudentValues({
      birth_date: new Date(Date.now()),
      consultant1: null,
      consultant2: null,
      topic: "",
      financing: "",
      faculty: "",
      date_of_admission: new Date(Date.now()),
    });
    setRole(0);
    setSelectedFinance("");
  };

  function validateForm() {
    if (
      values.firstname === "" ||
      values.lastname === "" ||
      values.email === "" ||
      role === 0
    ) {
      return false;
    }
    if (
      role === 1 &&
      (consultantValues.institution_name === "" ||
        consultantValues.faculty_name === "" ||
        consultantValues.department_name === "" ||
        // consultantValues.title === "" ||
        consultantValues.uni_role === "" ||
        consultantValues.degree === "")
    )
      return false;
    const today = new Date(Date.now());
    if (
      (role === 2 || role === 3) &&
      (studentValues.consultant1 === null ||
        studentValues.birth_date.getTime() > today.getTime() ||
        studentValues.date_of_admission.getTime() > today.getTime() ||
        studentValues.topic === "" ||
        studentValues.financing === "")
    )
      return false;
    return true;
  }

  function handleConsultantChange(
    e: ChangeEvent<HTMLSelectElement>,
    consultantNumber: number
  ) {
    const consultantsArray = consultants as Consultant[];
    const consultantKey = `consultant${consultantNumber}`;

    const selectedConsultant = consultantsArray.find(
      (consultant: Consultant) =>
        consultant.lastname + " " + consultant.firstname === e.target.value
    );

    setStudentValues({
      ...studentValues,
      [consultantKey]: selectedConsultant,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-5 lg:w-1/2 md:w-3/4 sm:w-full"
    >
      <h1 className="mb-10 text-5xl text-center">Személy hozzáadása</h1>
      <div className="flex flex-row justify-between">
        <FormRadioInput
          labelContent="Témavezető/oktató"
          name="role"
          border={true}
          checked={role === 1}
          onClick={(e) => setRole(1)}
        />
        {!error && (
          <>
            <FormRadioInput
              labelContent="Hallgató"
              name="role"
              border={true}
              checked={role === 2}
              onClick={(e) => setRole(2)}
            />
            <FormRadioInput
              labelContent="Hallgató (Egyéni felkészüléses)"
              name="role"
              border={true}
              checked={role === 3}
              onClick={(e) => setRole(3)}
            />
          </>
        )}
      </div>
      <FormTextInput
        inputPlaceholder="Vezetéknév "
        inputType="text"
        inputValue={values.lastname}
        onChange={(e) => setValues({ ...values, lastname: e.target.value })}
      />
      <FormTextInput
        inputPlaceholder="Keresztnév "
        inputType="text"
        inputValue={values.firstname}
        onChange={(e) => setValues({ ...values, firstname: e.target.value })}
      />
      <FormTextInput
        inputPlaceholder="E-mail "
        inputType="email"
        inputValue={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />

      {role === 1 && (
        <div>
          <FormSelectInput
            labelContent="Intézmény neve"
            options={institution_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                institution_name: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Kar neve"
            options={faculty_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                faculty_name: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Tanszék neve"
            options={department_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                department_name: e.target.value,
              })
            }
          />
          {/* <FormTextInput
            inputPlaceholder="Címe "
            inputType="text"
            inputValue={consultantValues.title}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                title: e.target.value,
              })
            }
          /> */}
          <FormSelectInput
            labelContent="Beosztás"
            options={uni_roles}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                uni_role: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Tudományos fokozat"
            options={degree_types}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                degree: e.target.value,
              })
            }
          />
        </div>
      )}

      {(role === 2 || role === 3) && (
        <div>
          <CustomDatePicker
            selectedDate={studentValues.birth_date}
            handleDateChange={(date: Date) =>
              handleBirthDateChange(date, "birth_date")
            }
            label="Születés ideje:"
          />
          <FormTextInput
            inputPlaceholder="Szak"
            inputType="text"
            inputValue={studentValues.faculty}
            onChange={(e) =>
              setStudentValues({ ...studentValues, faculty: e.target.value })
            }
          />
          <FormSelectInput
            labelContent="Témavezető #1"
            options={consultants.map((consultant: Consultant) => {
              return consultant.lastname + " " + consultant.firstname;
            })}
            onChange={(e) => handleConsultantChange(e, 1)}
          />
          <FormSelectInput
            labelContent="Témavezető #2 (nem kötelező)"
            options={consultants.map((consultant: Consultant) => {
              return consultant.lastname + " " + consultant.firstname;
            })}
            onChange={(e) => handleConsultantChange(e, 2)}
          />
          <FormTextInput
            inputPlaceholder="Téma címe "
            inputType="text"
            inputValue={studentValues.topic}
            onChange={(e) =>
              setStudentValues({ ...studentValues, topic: e.target.value })
            }
          />

          <div className="my-2 text-center">
            <label>Finanszírozási forma:</label>
            <div className="flex flex-row justify-around flex-wrap">
              <RadioButton
                value="Publicly funded"
                label="Állami ösztöndíjas"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <RadioButton
                value="Self funded"
                label="Önköltséges"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <RadioButton
                value="Stipendium Hungaricum"
                label="Stipendium Hungaricum"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <div>
                <RadioButton
                  value="Other"
                  label="Egyéb"
                  name="finance"
                  selectedValue={selectedFinance}
                  setSelectedValue={setSelectedFinance}
                />
              </div>
              {selectedFinance === "Other" && (
                <FormTextInput
                  inputType="text"
                  inputValue={studentValues.financing}
                  onChange={(e) => {
                    setStudentValues({
                      ...studentValues,
                      financing: e.target.value,
                    });
                  }}
                  inputPlaceholder="Finanszírozási forma"
                />
              )}
            </div>
          </div>
          <CustomDatePicker
            selectedDate={studentValues.date_of_admission}
            handleDateChange={(date: Date) =>
              handleBirthDateChange(date, "date_of_admission")
            }
            label="Felvétel dátuma:"
          />
        </div>
      )}
      <div className="text-red-600 font-bold">{errorMessage}</div>
      <div className="text-green-600 font-bold">{successMessage}</div>
      <button type="submit" className="btn">
        Hozzáadás
      </button>
    </form>
  );
}

export default AddPerson;
