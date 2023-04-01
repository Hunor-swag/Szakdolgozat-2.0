"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvitationLetterGenerator from "./invitation-letter-generator";

function Pdf() {
  const data = {
    committee_name: "Dr. Bertók Botond",
    committee_degree: "PhD",
    committee_rank: "docens",
    committee_university_name: "Pannon Egyetem",
    committee_department_name: "Rendszer- és Számítástudományi Tanszék",
    where: "Helyben",
    committee_gender: "férfi",
    student_name: "Kovács Béla",
    student_semester: "3",
    consultant1: "Dr. Bertók Botond",
    consultant2: "Dulai Tibor",
  };

  return (
    <PDFViewer className="w-screen h-screen m-2">
      <InvitationLetterGenerator {...data} />
    </PDFViewer>
  );
}

export default Pdf;
