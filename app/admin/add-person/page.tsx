"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, MouseEvent, useState, useEffect } from "react";
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

// TODO:
// Több témavezető max 2

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
  const [financeType, setFinanceType] = useState("");

  const [studentValues, setStudentValues] = useState({
    consultants: [""],
    topic: "",
    financing: "",
    date_of_admission: Date,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [consultants, setConsultants] = useState<string[]>([]);

  useEffect(() => {
    const getConsultants = async () => {
      await fetch("http://localhost:3000/api/consultants")
        .then((res) => res.json())
        .then((data) => {
          let consultantsData: string[] = data.map((consultant: any) => {
            return consultant.firstname + " " + consultant.lastname;
          });
          setConsultants(consultantsData);
        });
    };
    getConsultants();
  }, []);

  const fetchData = async () => {
    let fetchData;
    if (role === 1) {
      fetchData = {
        ...values,
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
        role: "student",
        tablename: "students",
        consultants: studentValues.consultants,
        topic: studentValues.topic,
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
    if (!validateForm()) {
      setErrorMessage("Minden mező kitöltése kötelező!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    fetchData();

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
      consultants: [""],
      topic: "",
      financing: "",
      date_of_admission: Date,
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
    return true;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-5 lg:w-1/2 md:w-3/4 sm:w-full"
    >
      <h1 className="mb-10 text-5xl text-center">Add person</h1>
      <div className="flex flex-row justify-between">
        <FormRadioInput
          labelContent="Consultant/Teacher"
          name="role"
          border={true}
          checked={role === 1}
          onClick={(e) => setRole(1)}
        />
        <FormRadioInput
          labelContent="Student"
          name="role"
          border={true}
          checked={role === 2}
          onClick={(e) => setRole(2)}
        />
        <FormRadioInput
          labelContent="Student (Individual preparation)"
          name="role"
          border={true}
          checked={role === 3}
          onClick={(e) => setRole(3)}
        />
      </div>
      <FormTextInput
        inputPlaceholder="Firstname "
        inputType="text"
        inputValue={values.firstname}
        onChange={(e) => setValues({ ...values, firstname: e.target.value })}
      />
      <FormTextInput
        inputPlaceholder="Lastname "
        inputType="text"
        inputValue={values.lastname}
        onChange={(e) => setValues({ ...values, lastname: e.target.value })}
      />
      <FormTextInput
        inputPlaceholder="Email "
        inputType="email"
        inputValue={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />

      {role === 1 && (
        <div>
          <FormSelectInput
            labelContent="Institution name"
            options={institution_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                institution_name: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Faculty name"
            options={faculty_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                faculty_name: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Department name"
            options={department_names}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                department_name: e.target.value,
              })
            }
          />
          <FormTextInput
            inputPlaceholder="Topic "
            inputType="text"
            inputValue={consultantValues.title}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                title: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Institutional role"
            options={uni_roles}
            onChange={(e) =>
              setConsultantValues({
                ...consultantValues,
                uni_role: e.target.value,
              })
            }
          />
          <FormSelectInput
            labelContent="Degree"
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
          <div className="flex justify-between">
            Consultants:
            <div className="flex">
              <PlusCircleIcon
                className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
                onClick={() => {
                  if (studentValues.consultants.length > 1) return;
                  setStudentValues({
                    ...studentValues,
                    consultants: [...studentValues.consultants, ""],
                  });
                }}
              />
              <MinusCircleIcon
                className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
                onClick={() => {
                  if (studentValues.consultants.length === 1) return;
                  let newArray = [...studentValues.consultants];
                  newArray.pop();
                  setStudentValues({ ...studentValues, consultants: newArray });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-stretch">
            {studentValues.consultants.map((consultant, index) => {
              return (
                <FormSelectInput
                  labelContent={`Consultant #${index + 1}`}
                  options={consultants}
                  onChange={(e) => {
                    let newArray = studentValues.consultants;
                    newArray[index] = e.target.value;
                    setStudentValues({
                      ...studentValues,
                      consultants: newArray,
                    });
                  }}
                />
              );
            })}
          </div>
          <FormTextInput
            inputPlaceholder="Topic "
            inputType="text"
            inputValue={studentValues.topic}
            onChange={(e) =>
              setStudentValues({ ...studentValues, topic: e.target.value })
            }
          />
          <div className="my-2 text-center">
            <label>Financing method</label>
            <div className="flex flex-row justify-around flex-wrap">
              <RadioButton
                value="Publicly funded"
                label="Publicly funded"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <RadioButton
                value="Self funded"
                label="Self funded"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <RadioButton
                value="Stipendicum Hungaricum"
                label="Stipendicum Hungaricum"
                name="finance"
                selectedValue={selectedFinance}
                setSelectedValue={setSelectedFinance}
              />
              <div>
                <RadioButton
                  value="Other"
                  label="Other"
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
                  inputPlaceholder="Finance type"
                />
              )}
              {/* Datepicker: Date of admission */}
            </div>
          </div>
        </div>
      )}
      <div className="text-red-600 font-bold">{errorMessage}</div>
      <div className="text-green-600 font-bold">{successMessage}</div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}

export default AddPerson;
