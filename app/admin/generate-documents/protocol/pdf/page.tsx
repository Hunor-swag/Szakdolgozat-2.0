"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Exam } from "../../../../../types/typings";
import ProtocolDocument from "../protocol-document";

function ProtocolPdfViewer() {
  const searchParams = useSearchParams();
  const examData = searchParams?.get("exam");
  if (!examData)
    return (
      <div>
        <h1 className="text-red-600 text-3xl font-bold">
          Error: No exam data found.
        </h1>
      </div>
    );

  const exam = (examData && JSON.parse(examData)) as Exam;

  return (
    <div className="flex justify-center w-full h-screen">
      <PDFViewer className="w-3/5 h-3/4">
        <ProtocolDocument exam={exam} />
      </PDFViewer>
    </div>
  );
}

export default ProtocolPdfViewer;
