"use client";

import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import FormSelectInput from "../../../components/FormSelectInput";
import FormTextInput from "../../../components/FormTextInput";
import { students } from "../../../constants";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

function Exam() {
  const [values, setValues] = useState({
    student: "",
    consultant: "",
    title: "",
    date: "",
    venue: "",
    main_subject: "",
  });

  const [consultants, setConsultants] = useState<string[]>([]);

  const [committees, setCommittees] = useState<string[]>([]);

  const [commission, setCommission] = useState<string[]>([""]);

  const [subjects, setSubjects] = useState<string[]>([""]);

  const [otherSubjects, setOtherSubjects] = useState<string[]>([""]);

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

  useEffect(() => {
    const getCommittees = async () => {
      await fetch("http://localhost:3000/api/committees")
        .then((res) => res.json())
        .then((data) => {
          let committeesData: string[] = data.map((committee: any) => {
            return committee.firstname + " " + committee.lastname;
          });
          setCommittees(committeesData);
        });
    };
    getCommittees();
  }, []);

  useEffect(() => {
    const getSubjects = async () => {
      await fetch("../subjects.json")
        .then((res) => res.json())
        .then((data) => {
          let subjectsData: string[] = data.map((subject: any) => {
            return subject.name;
          });
          setSubjects(subjectsData);
        });
    };
    getSubjects();
  }, []);

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
    newArray[index] = e.target.value;
    setCommission(newArray);
  };

  function validateForm() {
    if (
      values.student === "" ||
      values.consultant === "" ||
      values.title === "" ||
      values.date === "" ||
      values.venue === "" ||
      values.main_subject === "" ||
      commission.length === 0 ||
      otherSubjects.length === 0
    ) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    console.log(values);
    console.log(otherSubjects);
    console.log(commission);
  }, [values, otherSubjects, commission]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   alert("Kérlek töltsd ki az összes mezőt!");
    //   return;
    // }
    const body = JSON.stringify({
      student: values.student,
      consultant: "asdf",
      title: values.title,
      date: "2021-05-05",
      venue: values.venue,
      main_subject: values.main_subject,
      otherSubjects: otherSubjects,
      commission: commission,
    });

    const response = await fetch("http://localhost:3000/api/addExam", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-center mb-10">Komplex vizsga</h1>
      <FormSelectInput
        labelContent="Hallgató "
        onChange={(e) => setValues({ ...values, student: e.target.value })}
        options={students}
      />
      <FormSelectInput
        labelContent="Témavezető"
        options={consultants}
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
        labelContent="Alap tárgy"
        onChange={(e) => setValues({ ...values, main_subject: e.target.value })}
        options={subjects}
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
              key={index}
              labelContent={`Melléktárgy ${index + 1}`}
              onChange={(e) => handleOtherSubjectChange(e, index)}
              options={subjects}
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
                  onClick={() => setCommission([...commission, ""])}
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
                    {index === 0 ? <p>Elnök</p> : <p>{index}. tag</p>}
                    <FormSelectInput
                      labelContent=""
                      options={committees}
                      onChange={(e) => {
                        handleCommitteeChange(e, index);
                      }}
                    />
                  </td>
                  <td key={index + "main_subj"}>
                    <input type="radio" name="main_subject" />
                  </td>
                  <td key={index + "other_subj"}>
                    <input type="checkbox" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn bg-green-600 hover:bg-green-500" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Exam;
