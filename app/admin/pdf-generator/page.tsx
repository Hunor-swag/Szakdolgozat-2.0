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
    commission: [
      {
        name: "Dr. Dósa György",
        degree: "DSc",
        rank: "egyetemi tanár",
        short_university_name: "PE",
        chairman: true,
        examiner: false,
        member: false,
      },
      {
        name: "Dr. Szederkényi Gábor",
        degree: "DSc",
        rank: "egyetemi tanár",
        short_university_name: "PPKE",
        chairman: false,
        examiner: true,
        subject:
          "Nagy műszaki rendszerek és folyamatok optimalizálása (főtárgy)",
        member: false,
      },
      {
        name: "Dr. Heckl István",
        degree: "PhD",
        rank: "egyetemi docens",
        short_university_name: "PE",
        chairman: false,
        examiner: true,
        subject: "Számításelmélet II. (melléktárgy)",
        member: false,
      },
      {
        name: "Dr. Bertók Botond",
        degree: "PhD",
        rank: "egyetemi docens",
        short_university_name: "PE",
        chairman: false,
        examiner: false,
        member: true,
      },
      {
        name: "Dr. Hegyháti Máté",
        degree: "PhD",
        rank: "egyetemi docens",
        short_university_name: "SoE",
        chairman: false,
        examiner: false,
        member: true,
      },
    ],
    link_to_online_exam:
      "https://teams.microsoft.com/l/meetup-join/19%3ameeting_M2E0ZjA1YmQtMThlMS00NTc2LTk5NzMtOTY3NGQwNmY0Y2Ex%40thread.v2/0?context=%7b%22Tid%22%3a%22d77b9052-84e8-4e3a-b61f-d1f9a03d0a8a%22%2c%22Oid%22%3a%22cb467937-9d1d-459b-8fff-2ff4ac347f5b%22%7d",
    exam_date: new Date("January 12, 2023 13:00"),

    building: "I",
    room: "726",
    name_of_principal: "Dr. Hartung Ferenc",
  };

  return (
    <>
      <PDFViewer className="w-screen h-screen m-2">
        <InvitationLetterGenerator {...data} />
      </PDFViewer>
    </>
  );
}

export default Pdf;
