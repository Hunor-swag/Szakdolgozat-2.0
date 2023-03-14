"use client";

import { FormEvent, MouseEvent, useState } from "react";
import FormRadioInput from "../../../components/FormRadioInput";
import FormSelectInput from "../../../components/FormSelectInput";
import FormTextInput from "../../../components/FormTextInput";
import {
  consultants,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        labelContent="Firstname "
        inputType="text"
        inputValue={values.firstname}
        onChange={(e) => setValues({ ...values, firstname: e.target.value })}
      />
      <FormTextInput
        labelContent="Lastname "
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
        labelContent="Email "
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
            labelContent="Topic "
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
            labelContent="Topic "
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
                  labelContent=""
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

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}

export default AddPerson;
