"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../../hooks/useFetch";
import { Committee, Student } from "../../../types/typings";
import DatePickerWithTime from "../../../components/DatePickerWithTime";

// Csak egy melléktárgy
// bizottságnál 2. taggal kezdődjön

function Exam() {
  const [values, setValues] = useState({
    student: {} as Student | undefined,
    date: new Date(Date.now()),
    venue: "",
    link: "",
    faculty_writer: "",
    main_subject: "",
    other_subject: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedMainSubject, setSelectedMainSubject] = useState(-1);
  const [selectedOtherSubject, setSelectedOtherSubject] = useState(-1);

  const { data: students, error: studentsError } = useFetch(
    "http://localhost:3000/api/students"
  );
  console.log(students);
  const { data: committees, error: committeesError } = useFetch(
    "http://localhost:3000/api/committees"
  );

  const [commission, setCommission] = useState([
    {
      firstname: "",
      lastname: "",
      name: "",
      uni_role: "",
      degree: "",
      institution_name: "",
      short_institution_name: "",
      department_name: "",
      main_subj_examiner: false,
      other_subj_examiner: false,
    },
  ]);

  const { data: subjects, error: subjectsError } = useFetch("../subjects.json");

  const handleDateChange = (date: Date) => {
    setValues((prevValues) => {
      return { ...prevValues, date: date };
    });
  };

  const handleCommitteeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    let newArray = [...commission];

    for (let i = 0; i < committees.length; i++) {
      const committeesArray = committees as Committee[];
      if (committeesArray[i].name === e.target.value) {
        newArray[index] = {
          firstname: committeesArray[i].firstname,
          lastname: committeesArray[i].lastname,
          name: committeesArray[i].name,
          uni_role: committeesArray[i].uni_role,
          degree: committeesArray[i].degree,
          institution_name: committeesArray[i].institution_name,
          short_institution_name: committeesArray[i].short_institution_name,
          department_name: committeesArray[i].department_name,
          main_subj_examiner: false,
          other_subj_examiner: false,
        };
        break;
      }
    }
    setCommission(newArray);
  };

  function validateForm() {
    if (
      !values.student ||
      // values.date === "" ||
      values.venue === "" ||
      values.main_subject === "" ||
      values.other_subject === "" ||
      commission.length === 0
    ) {
      return false;
    }
    return true;
  }

  async function sendFormData() {
    let studentsArray = students as Student[];
    const student = studentsArray.find(
      (student) =>
        student.lastname + " " + student.firstname ===
        values.student?.lastname + " " + values.student?.firstname
    );

    const [building, room] = values.venue.split(".");

    const body = JSON.stringify({
      student: student,
      date: values.date,
      venue: values.venue,
      building: building,
      room: room,
      link: values.link,
      main_subject: values.main_subject,
      other_subject: values.other_subject,
      commission: commission,
    });

    await fetch("http://localhost:3000/api/addExam", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage("Vizsga sikeresen hozzáadva!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((err) => {
        setErrorMessage("Hiba történt: " + err);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Minden mező kitöltése kötelező!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    await sendFormData();
    resetForm();
  };

  function resetForm() {
    setCommission([
      {
        firstname: "",
        lastname: "",
        name: "",
        degree: "",
        uni_role: "",
        institution_name: "",
        short_institution_name: "",
        department_name: "",
        main_subj_examiner: false,
        other_subj_examiner: false,
      },
    ]);
    setSelectedMainSubject(-1);
    setSelectedOtherSubject(-1);
    setValues({
      student: {} as Student,
      date: new Date(Date.now()),
      venue: "",
      link: "",
      main_subject: "",
      other_subject: "",
      faculty_writer: "",
    });
  }

  useEffect(() => {
    let newArray = [...commission];
    newArray.map((committee, index) => {
      if (index === selectedMainSubject) {
        committee.main_subj_examiner = true;
      } else {
        committee.main_subj_examiner = false;
      }
    });
    setCommission(newArray);
  }, [selectedMainSubject]);

  useEffect(() => {
    let newArray = [...commission];
    newArray.map((committee, index) => {
      if (index === selectedOtherSubject) {
        committee.other_subj_examiner = true;
      } else {
        committee.other_subj_examiner = false;
      }
    });
    setCommission(newArray);
  }, [selectedOtherSubject]);

  function handleStudentChange(e: ChangeEvent<HTMLSelectElement>) {
    const studentsArray = students as Student[];
    const student = studentsArray.find(
      (student) => student.lastname + " " + student.firstname === e.target.value
    );
    console.log(student);
    setValues({ ...values, student: student });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-center mb-10">Komplex vizsga</h1>
      <FormSelectInput
        value={values.student?.lastname + " " + values.student?.firstname}
        labelContent="Hallgató "
        onChange={handleStudentChange}
        options={students.map((student: any) => {
          return student.lastname + " " + student.firstname;
        })}
      />

      <DatePickerWithTime
        label="Vizsgaidőpont"
        selectedDate={values.date}
        handleDateChange={handleDateChange}
      />

      <FormTextInput
        inputPlaceholder="Helyszín (pl. I.317)"
        inputType="text"
        inputValue={values.venue}
        onChange={(e) => setValues({ ...values, venue: e.target.value })}
      />

      <FormTextInput
        inputPlaceholder="Link az online részvételhez"
        inputType="text"
        inputValue={values.link}
        onChange={(e) =>
          setValues((prevValues) => {
            return { ...prevValues, link: e.target.value };
          })
        }
      />

      <FormSelectInput
        value={values.main_subject}
        labelContent="Alap tárgy"
        onChange={(e) => setValues({ ...values, main_subject: e.target.value })}
        options={subjects.map((subject: any) => {
          return subject.name;
        })}
      />

      <FormSelectInput
        value={values.other_subject}
        labelContent="Melléktárgy"
        onChange={(e) => {
          setValues({ ...values, other_subject: e.target.value });
        }}
        options={subjects.map((subject: any) => {
          return subject.name;
        })}
      />
      <div className="flex flex-col">
        <h1 className="text-center text-xl mt-5">Bizottság:</h1>
        <table className="text-center w-full border-separate border-spacing-x-5">
          <thead>
            <tr>
              <td className="flex">
                <PlusCircleIcon
                  className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
                  onClick={() => {
                    if (commission.length < 5)
                      setCommission([
                        ...commission,
                        {
                          firstname: "",
                          lastname: "",
                          name: "",
                          uni_role: "",
                          degree: "",
                          institution_name: "",
                          short_institution_name: "",
                          department_name: "",
                          main_subj_examiner: false,
                          other_subj_examiner: false,
                        },
                      ]);
                  }}
                />
                <MinusCircleIcon
                  className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
                  onClick={() => {
                    if (commission.length === 1) return;
                    let newArray = [...commission];
                    newArray.pop();
                    setCommission(newArray);
                  }}
                />
              </td>
              <td>A fő tárgy vizsgáztatója</td>
              <td>A melléktárgy vizsgáztatója</td>
            </tr>
          </thead>
          <tbody>
            {commission.map((committee, index) => {
              return (
                <tr key={index}>
                  <td className="flex items-center" key={index + "name"}>
                    {index === 0 ? <p>Elnök</p> : <p>{index + 1}. tag</p>}
                    <FormSelectInput
                      value={committee.name}
                      labelContent=""
                      options={committees.map((committee: any) => {
                        return committee.name;
                      })}
                      onChange={(e) => {
                        handleCommitteeChange(e, index);
                      }}
                    />
                  </td>
                  <td key={index + "main_subj"}>
                    <input
                      type="radio"
                      name="main_subject"
                      onChange={() => setSelectedMainSubject(index)}
                      checked={selectedMainSubject === index}
                    />
                  </td>
                  <td key={index + "other_subj"}>
                    <input
                      type="radio"
                      name="other_subject"
                      onChange={() => setSelectedOtherSubject(index)}
                      checked={selectedOtherSubject === index}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <FormTextInput
          inputPlaceholder="Jegyzőkönyvvezető neve"
          inputType="text"
          inputValue={values.faculty_writer}
          onChange={(e) =>
            setValues((prevValues) => {
              return { ...prevValues, faculty_writer: e.target.value };
            })
          }
        />
        <div className="text-red-600 font-bold">{errorMessage}</div>
        <div className="text-green-600 font-bold">{successMessage}</div>
        <button className="btn bg-green-600 hover:bg-green-500" type="submit">
          Hozzáadás
        </button>
      </div>
    </form>
  );
}

export default Exam;
