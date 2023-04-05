"use client";

import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../../hooks/useFetch";

// Csak egy melléktárgy
// bizottságnál 2. taggal kezdődjön

type Committee = {
  name: string;
  main_subj_examiner: boolean;
  other_subj_examiner: boolean;
};

function Exam() {
  const [values, setValues] = useState({
    student: "",
    consultant: "",
    title: "",
    date: "",
    venue: "",
    main_subject: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedMainSubject, setSelectedMainSubject] = useState(-1);
  const [selectedOtherSubject, setSelectedOtherSubject] = useState(-1);

  const [students] = useFetch("http://localhost:3000/api/students");

  const [consultants] = useFetch("http://localhost:3000/api/consultants");

  const [committees] = useFetch("http://localhost:3000/api/committees");

  const [commission, setCommission] = useState<Committee[]>([
    { name: "", main_subj_examiner: false, other_subj_examiner: false },
  ]);

  const [subjects] = useFetch("../subjects.json");

  const [otherSubjects, setOtherSubjects] = useState<string[]>([""]);

  const handleOtherSubjectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    let newArray = [...otherSubjects];
    newArray[index] = e.target.value;
    setOtherSubjects(newArray);
  };

  const handleCommitteeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    let newArray = [...commission];
    newArray[index] = {
      name: e.target.value,
      main_subj_examiner: false,
      other_subj_examiner: false,
    };
    setCommission(newArray);
  };

  function validateForm() {
    if (
      values.student === "" ||
      values.consultant === "" ||
      values.title === "" ||
      // values.date === "" ||
      values.venue === "" ||
      values.main_subject === "" ||
      commission.length === 0 ||
      otherSubjects.length === 0
    ) {
      return false;
    }
    return true;
  }

  async function sendFormData() {
    const body = JSON.stringify({
      student: values.student,
      consultant: values.consultant,
      title: values.title,
      date: "2021-05-05",
      venue: values.venue,
      main_subject: values.main_subject,
      otherSubjects: otherSubjects,
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
        setSuccessMessage("Személy sikeresen hozzáadva!");
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
      { name: "", main_subj_examiner: false, other_subj_examiner: false },
    ]);
    setOtherSubjects([""]);
    setSelectedMainSubject(-1);
    setSelectedOtherSubject(-1);
    setValues({
      student: "",
      consultant: "",
      title: "",
      date: "",
      venue: "",
      main_subject: "",
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

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-center mb-10">Komplex vizsga</h1>
      <FormSelectInput
        value={values.student}
        labelContent="Hallgató "
        onChange={(e) => setValues({ ...values, student: e.target.value })}
        options={students.map((student: any) => {
          return student.firstname + " " + student.lastname;
        })}
      />
      <FormSelectInput
        value={values.consultant}
        labelContent="Témavezető"
        options={consultants.map((consultant: any) => {
          return consultant.firstname + " " + consultant.lastname;
        })}
        onChange={(e) => setValues({ ...values, consultant: e.target.value })}
      />
      <FormTextInput
        inputPlaceholder="A téma címe"
        inputType="text"
        inputValue={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />

      {/* Datepicker here */}

      <FormTextInput
        inputPlaceholder="Helyszín"
        inputType="text"
        inputValue={values.venue}
        onChange={(e) => setValues({ ...values, venue: e.target.value })}
      />

      <FormSelectInput
        value={values.main_subject}
        labelContent="Alap tárgy"
        onChange={(e) => setValues({ ...values, main_subject: e.target.value })}
        options={subjects.map((subject: any) => {
          return subject.name;
        })}
      />

      <div className="flex justify-between">
        Melléktárgyak:{" "}
        <div className="flex">
          <PlusCircleIcon
            className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
            onClick={() => setOtherSubjects([...otherSubjects, ""])}
          />
          <MinusCircleIcon
            className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
            onClick={() => {
              if (otherSubjects.length === 1) return;
              let newArray = [...otherSubjects];
              newArray.pop();
              setOtherSubjects(newArray);
            }}
          />
        </div>
      </div>
      <div>
        {otherSubjects.map((subject, index) => {
          return (
            <FormSelectInput
              value={subject}
              key={index}
              labelContent={`Melléktárgy ${index + 1}`}
              onChange={(e) => handleOtherSubjectChange(e, index)}
              options={subjects.map((subject: any) => {
                return subject.name;
              })}
            />
          );
        })}
      </div>
      <div className="flex flex-col">
        <h1 className="text-center text-xl mt-5">Bizottság:</h1>
        <table className="text-center w-full border-separate border-spacing-x-5 ">
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
                          name: "",
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
                        return committee.firstname + " " + committee.lastname;
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
        <div className="text-red-600 font-bold">{errorMessage}</div>
        <div className="text-green-600 font-bold">{successMessage}</div>
        <button className="btn bg-green-600 hover:bg-green-500" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Exam;
