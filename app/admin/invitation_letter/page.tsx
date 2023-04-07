"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { ChangeEvent, useEffect, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { useFetch } from "../../../hooks/useFetch";
import { Committee, Exam } from "../../../types/typings";
import InvitationLetterGenerator from "./invitation-letter-generator";

function InvitationLetter() {
  const [exams] = useFetch("/api/exams");
  const [selectedExam, setSelectedExam] = useState<Exam>();
  const [showCode, setShowCode] = useState(false);

  const handleExamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const examsArray = exams as Exam[];
    const selectedExamData = examsArray.find((exam) => {
      return (
        `${exam.student.lastname} ${exam.student.firstname}` === e.target.value
      );
    });

    setSelectedExam(selectedExamData);
  };

  useEffect(() => {
    console.log(selectedExam);
  }, [selectedExam]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCode(true);
  };

  return (
    <div className="flex w-screen flex-col items-center">
      <form onSubmit={onSubmit}>
        <FormSelectInput
          labelContent="Vizsga"
          onChange={handleExamChange}
          options={exams.map((exam) => {
            let examData = exam as Exam;
            return `${examData.student.lastname} ${examData.student.firstname} `;
          })}
        />
        <button className="btn" type="submit">
          Generate
        </button>
      </form>
      {showCode && selectedExam && (
        <div className="w-full">
          {selectedExam.commission.map(
            (committee: Committee, index: number) => {
              return (
                <PDFViewer className="w-1/2 h-screen m-2">
                  <InvitationLetterGenerator
                    data={selectedExam}
                    committee={selectedExam.commission[index]}
                  />
                </PDFViewer>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default InvitationLetter;
