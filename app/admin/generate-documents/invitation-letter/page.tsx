"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import InvitationLetterDocument from "./invitation-letter-document";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Committee, Exam } from "../../../../types/typings";
import { useSearchParams } from "next/navigation";

function InvitationLetter() {
  const searchParams = useSearchParams();
  const examData = searchParams?.get("exam");

  const exam = (examData && JSON.parse(examData)) as Exam;

  return (
    <div className="flex w-screen flex-col items-center">
      <div className="w-full flex justify-center flex-row flex-wrap">
        <h1 className="text-3xl my-5 font-semibold">Meghívó levelek:</h1>
        <div className="w-full flex flex-row justify-center">
          {exam.commission.map((committee: Committee, index: number) => {
            return (
              <div key={index} className="flex flex-col items-center">
                <Link
                  href={{
                    pathname: "/admin/generate-documents/invitation-letter/pdf",
                    query: {
                      exam: JSON.stringify(exam),
                      committee: JSON.stringify(committee),
                    },
                  }}
                >
                  <button className="btn mx-2 bg-blue-600">{`${committee.lastname} ${committee.firstname}`}</button>
                </Link>
                <PDFDownloadLink
                  document={
                    <InvitationLetterDocument
                      exam={exam}
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
          })}
        </div>
      </div>
    </div>
  );
}

export default InvitationLetter;
