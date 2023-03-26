"use client";

import { FormEvent, MouseEvent, useState, useEffect } from "react";
import FormRadioInput from "../../../components/FormRadioInput";
import FormSelectInput from "../../../components/FormSelectInput";
import FormTextInput from "../../../components/FormTextInput";
import {
  degree_types,
  department_names,
  faculty_names,
  institution_names,
  uni_roles,
} from "../../../constants";

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

  const [studentValues, setStudentValues] = useState({
    consultant: "",
    topic: "",
    financing: "",
    date_of_admission: Date,
  });

  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
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
        consultant: studentValues.consultant,
        topic: studentValues.topic,
        financing: studentValues.financing,
        date_of_admission: studentValues.date_of_admission,
      };
    }

    const rawData = await fetch("http://localhost:3000/api/addPerson", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    }).then((response: Response) => console.log(response));

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
      consultant: "",
      topic: "",
      financing: "",
      date_of_admission: Date,
    });

    setRole(0);
  };

  function validateForm() {
    if (
      values.firstname === "" ||
      values.lastname === "" ||
      values.email === "" ||
      role === 0
    ) {
      setErrorMessage("Kérem, töltse ki a szükséges mezőket!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
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
      <div className="my-2 text-center">
        <label>Language</label>
        <div className="flex flex-row justify-around">
          <FormRadioInput labelContent="Hungarian" name="lang" border={false} />
          <FormRadioInput labelContent="English" name="lang" border={false} />
        </div>
      </div>
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
          <FormSelectInput
            labelContent="Consultant"
            options={consultants}
            onChange={(e) =>
              setStudentValues({
                ...studentValues,
                consultant: e.target.value,
              })
            }
          />
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
              <FormRadioInput
                labelContent="Publicly funded"
                name="finance"
                border={false}
              />
              <FormRadioInput
                labelContent="Self funded"
                name="finance"
                border={false}
              />
              <FormRadioInput
                labelContent="Stipendium Hungaricum"
                name="finance"
                border={false}
              />
              <div className="flex flex-row">
                <FormRadioInput
                  labelContent="Else: "
                  name="finance"
                  border={false}
                />
                <FormTextInput
                  inputPlaceholder=""
                  inputType="text"
                  inputValue={studentValues.financing}
                  onChange={(e) =>
                    setStudentValues({
                      ...studentValues,
                      financing: e.target.value,
                    })
                  }
                />
              </div>
              {/* Datepicker: Date of admission */}
            </div>
          </div>
        </div>
      )}
      <div className="text-red-600 font-bold">{errorMessage}</div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}

export default AddPerson;
