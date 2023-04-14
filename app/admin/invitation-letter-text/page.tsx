"use client";

import { ChangeEvent, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { useFetch } from "../../../hooks/useFetch";
import { Committee, Exam } from "../../../types/typings";
import { saveAs } from "file-saver";
import generateText from "./generateText";

function InvitationLetterText() {
  const { data: exams, error: errorExams } = useFetch("/api/exams");
  const { data: committees, error: errorCommittees } =
    useFetch("/api/committees");
  const [selectedExam, setSelectedExam] = useState<Exam>();
  const [selectedCommittee, setSelectedCommittee] = useState<Committee>();

  const handleExamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const examsArray = exams as Exam[];
    const selectedExamData = examsArray.find((exam) => {
      return (
        `${exam.student.lastname} ${exam.student.firstname}` === e.target.value
      );
    });

    setSelectedExam(selectedExamData);
  };

  const handleCommitteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const committeesArray = committees as Committee[];
    const selectedCommitteeData = committeesArray.find((committee) => {
      return `${committee.lastname} ${committee.firstname}` === e.target.value;
    });
    console.log(selectedCommitteeData);
    setSelectedCommittee(selectedCommitteeData);
  };

  const handleClick = () => {
    if (!selectedExam || !selectedCommittee) return;
    const textContent = generateText(selectedExam, selectedCommittee);
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    saveAs(
      blob,
      `${selectedCommittee.lastname}-${selectedCommittee.firstname}-felkerolevel.txt`
    );
  };

  return (
    <div className="flex flex-col itmes-center">
      <FormSelectInput
        labelContent="Vizsga"
        onChange={handleExamChange}
        options={exams.map((exam: Exam) => {
          let examData = exam as Exam;
          return `${examData.student.lastname} ${examData.student.firstname} `;
        })}
      />
      {selectedExam && (
        <FormSelectInput
          labelContent="Tag"
          onChange={handleCommitteeChange}
          options={selectedExam?.commission.map(
            (committee: Committee) =>
              `${committee.lastname} ${committee.firstname}`
          )}
        />
      )}

      <button className="btn" onClick={handleClick}>
        Download Text File
      </button>
    </div>
  );
}

export default InvitationLetterText;
