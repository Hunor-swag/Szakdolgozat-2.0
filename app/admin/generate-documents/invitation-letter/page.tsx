"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { FormSelectInput } from "../../../components/FormSelectInput";
import { useFetch } from "../../../hooks/useFetch";
import { Committee, Exam } from "../../../types/typings";
import InvitationLetterDocument from "./invitation-letter-document";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function InvitationLetter() {
  const { data: exams, error } = useFetch("/api/exams");
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCode(true);
  };

  return (
    <div className="flex w-screen flex-col items-center">
      <form onSubmit={onSubmit} className="flex items-center flex-col">
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
      <div className="w-full flex justify-center flex-row flex-wrap">
        {showCode && selectedExam && (
          <>
            <h1 className="text-3xl my-5 font-semibold">Meghívó levelek:</h1>
            <div className="w-full flex flex-row justify-center">
              {selectedExam.commission.map(
                (committee: Committee, index: number) => {
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <Link
                        href={{
                          pathname: "/admin/invitation-letter/pdf",
                          query: {
                            exam: JSON.stringify(selectedExam),
                            committee: JSON.stringify(committee),
                          },
                        }}
                      >
                        <button className="btn mx-2 bg-blue-600">{`${committee.lastname} ${committee.firstname}`}</button>
                      </Link>
                      <PDFDownloadLink
                        document={
                          <InvitationLetterDocument
                            exam={selectedExam}
                            committee={committee}
                          />
                        }
                        fileName={`${committee.lastname}_${committee.firstname}.pdf`}
                      >
                        {({ blob, url, loading, error }) => {
                          if (error) return "Error";
                          return loading ? (
                            "Loading..."
                          ) : (
                            <ArrowDownTrayIcon className="w-10 h-10" />
                          );
                        }}
                      </PDFDownloadLink>
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InvitationLetter;
