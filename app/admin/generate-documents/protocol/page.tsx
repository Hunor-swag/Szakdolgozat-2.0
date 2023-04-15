"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../../hooks/useFetch";
import { Exam } from "../../../types/typings";
import { FormSelectInput } from "../../../components/FormSelectInput";

function InvitationLetter() {
  const { data: exams, error } = useFetch("/api/exams");
  const [selectedExam, setSelectedExam] = useState<Exam>();

  const handleExamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const examsArray = exams as Exam[];
    const selectedExamData = examsArray.find((exam) => {
      return (
        `${exam.student.lastname} ${exam.student.firstname}` === e.target.value
      );
    });

    setSelectedExam(selectedExamData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-screen flex-col items-center">
      <form onSubmit={onSubmit} className="flex items-center flex-col">
        <FormSelectInput
          labelContent="Vizsga"
          onChange={handleExamChange}
          options={exams.map((exam: Exam) => {
            let examData = exam as Exam;
            return `${examData.student.lastname} ${examData.student.firstname} `;
          })}
        />
        <Link
          href={{
            pathname: "/admin/protocol/pdf",
            query: {
              exam: JSON.stringify(selectedExam),
            },
          }}
        >
          <button className="btn" type="submit">
            Generate
          </button>
        </Link>
      </form>
    </div>
  );
}

export default InvitationLetter;
