"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Committee, Exam } from "../../../../../types/typings";
import InvitationLetterDocument from "../invitation-letter-document";

function InvitationLetterPdfViewer() {
  const searchParams = useSearchParams();
  const examData = searchParams?.get("exam");
  const committeeData = searchParams?.get("committee");
  if (!committeeData || !examData)
    return (
      <div>
        <h1 className="text-red-600 text-3xl font-bold">
          Error: No exam data found.
        </h1>
      </div>
    );

  const exam = (examData && JSON.parse(examData)) as Exam;
  const committee = (committeeData && JSON.parse(committeeData)) as Committee;

  return (
    <div className="flex w-full flex-col items-center h-screen">
      <h1 className="text-3xl font-bold my-5">{`${committee.lastname} ${committee.firstname} meghívólevele`}</h1>
      <PDFViewer className="w-3/5 h-3/4">
        <InvitationLetterDocument exam={exam} committee={committee} />
      </PDFViewer>
    </div>
  );
}

export default InvitationLetterPdfViewer;
