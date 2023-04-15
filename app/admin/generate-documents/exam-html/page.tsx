"use client";

import { saveAs } from "file-saver";
import React, { ChangeEvent, useState } from "react";
import { FormSelectInput } from "../../../../components/FormSelectInput";
import { useFetch } from "../../../../hooks/useFetch";
import { Exam } from "../../../../types/typings";
import generateHtml from "./generateHtml";

function ExamHtml() {
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

  const handleClick = () => {
    if (!selectedExam) return;
    const htmlContent = generateHtml(selectedExam);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    saveAs(
      blob,
      `${selectedExam.student.lastname}-${selectedExam.student.firstname}-vizsga.html`
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
      <button className="btn" onClick={handleClick}>
        Download HTML File
      </button>
    </div>
  );
}

export default ExamHtml;
