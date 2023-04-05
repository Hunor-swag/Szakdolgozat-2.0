"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { Exam } from "../../../types/typings";
import InvitationLetterGenerator from "./invitation-letter-generator";

function Pdf(data: Exam) {
  return (
    <>
      {/* <PDFViewer className="w-screen h-screen m-2">
        <InvitationLetterGenerator {...data} />
      </PDFViewer> */}
    </>
  );
}

export default Pdf;
