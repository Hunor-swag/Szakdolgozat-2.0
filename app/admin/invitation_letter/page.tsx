"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { FormTextInput } from "../../../components/FormTextInput";
import { useFetch } from "../../../hooks/useFetch";
import { Committee } from "../../../types/typings";

function InvitationLetter() {
  const [values, setValues] = useState({
    selected_committee: {
      firstname: "",
      lastname: "",
      degree: "",
      rank: "",
      institution_name: "",
      department_name: "",
    },
    where: "",
    committee_gender: "",
    student_name: "",
    student_semester: "",
    consultant1: "",
    consultant2: "",
    commission: {
      chairman: null,
      examiners: [],
      members: [],
    },
    link_to_online_exam: "",
    exam_date: new Date(),
    building: "",
    room: "",
    name_of_principal: "",
  });

  const [committees] = useFetch("/api/committees");
  const [students] = useFetch("/api/students");
  const [consultants] = useFetch("/api/consultants");

  useEffect(() => {
    console.log(values.selected_committee);
  }, [values.selected_committee]);

  function handleSelectedCommitteeChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedCommitteeName = e.target.value;
    const selectedCommittee = committees.find(
      (committee: any) =>
        committee?.firstname + " " + committee?.lastname ===
        selectedCommitteeName
    );
    if (selectedCommittee) {
      setValues({
        ...values,
        selected_committee: selectedCommittee,
      });
    }
  }

  function handleSelectedChairmanChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedChairmanName = e.target.value;
    const selectedChairman = committees.find(
      (committee: any) =>
        committee?.firstname + " " + committee?.lastname ===
        selectedChairmanName
    );
    if (selectedChairman) {
      setValues({
        ...values,
        commission: {
          ...values.commission,
          chairman: selectedChairman,
        },
      });
    }
  }

  return (
    <div>
      <form>
        <FormSelectInput
          value={
            values.selected_committee?.firstname +
            " " +
            values.selected_committee?.lastname
          }
          labelContent="Meghívni kívánt bizottsági tag:"
          onChange={handleSelectedCommitteeChange}
          options={committees.map((committee: any) => {
            return committee.firstname + " " + committee.lastname;
          })}
        />
        <FormSelectInput
          labelContent="Vizsga típusa:"
          onChange={(e) => {
            setValues({
              ...values,
              where: e.target.value,
            });
          }}
          options={["Jelenléti", "Online"]}
        />
        <FormSelectInput
          labelContent="Bizottsági tag neme:"
          onChange={(e) => {
            setValues({
              ...values,
              committee_gender: e.target.value,
            });
          }}
          options={["Férfi", "Nő"]}
        />
        <FormSelectInput
          labelContent="Hallgató neve:"
          onChange={(e) => {
            setValues({
              ...values,
              student_name: e.target.value,
            });
          }}
          options={students.map((student: any) => {
            return student.firstname + " " + student.lastname;
          })}
        />
        <FormTextInput
          inputValue={values.student_semester}
          inputPlaceholder="Hallgató féléve:"
          onChange={(e) => {
            setValues({
              ...values,
              student_semester: e.target.value,
            });
          }}
          inputType="text"
        />
        <FormTextInput
          inputValue={values.consultant1}
          inputPlaceholder="Konzulens"
          onChange={(e) => {
            setValues({
              ...values,
              consultant1: e.target.value,
            });
          }}
          inputType="text"
        />
        <FormTextInput
          inputValue={values.consultant2}
          inputPlaceholder="2. konzulens (opcionális)"
          onChange={(e) => {
            setValues({
              ...values,
              consultant2: e.target.value,
            });
          }}
          inputType="text"
        />
        <FormSelectInput
          labelContent="Elnök: "
          onChange={handleSelectedChairmanChange}
          options={committees.map((committee: any) => {
            return committee.firstname + " " + committee.lastname;
          })}
        />
        {/* <div className="flex justify-between">
          Vizsgáztatók:{" "}
          <div className="flex">
            <PlusCircleIcon
              className="w-10 cursor-pointer hover:text-black transition-all ease-in-out duration-300"
              onClick={() => {
                let newArr = [...values.commission.examiners];
                newArr.push({
                  firstname: "",
                  lastname: "",
                  degree: "",
                  rank: "",
                  institution_name: "",
                  department_name: "",
                });

                setValues({
                  ...values,
                  commission: {
                    ...values.commission,
                    examiners: newArr,
                  },
                });
              }}
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
        </div> */}
      </form>
    </div>
  );
}

export default InvitationLetter;
