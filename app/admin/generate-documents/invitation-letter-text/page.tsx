"use client";

import { ChangeEvent, useState } from "react";
import { FormSelectInput } from "../../../../components/FormSelectInput";
import { useFetch } from "../../../../hooks/useFetch";
import { Committee, Exam } from "../../../../types/typings";
import { saveAs } from "file-saver";
import generateText from "./generateText";
import { useSearchParams } from "next/navigation";

function InvitationLetterText() {
  const searchParams = useSearchParams();
  const examData = searchParams?.get("exam");

  const exam = (examData && JSON.parse(examData)) as Exam;

  const { data: committees, error: errorCommittees } =
    useFetch("/api/committees");
  const [selectedCommittee, setSelectedCommittee] = useState<Committee>();

  const handleCommitteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const committeesArray = committees as Committee[];
    const selectedCommitteeData = committeesArray.find((committee) => {
      return `${committee.lastname} ${committee.firstname}` === e.target.value;
    });
    setSelectedCommittee(selectedCommitteeData);
  };

  const handleClick = () => {
    if (!selectedCommittee) return;
    const textContent = generateText(exam, selectedCommittee);
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    saveAs(
      blob,
      `${selectedCommittee.lastname}-${selectedCommittee.firstname}-felkerolevel.txt`
    );
  };

  return (
    <div className="flex flex-col itmes-center">
      <FormSelectInput
        labelContent="Tag"
        onChange={handleCommitteeChange}
        options={exam?.commission.map(
          (committee: Committee) =>
            `${committee.lastname} ${committee.firstname}`
        )}
      />

      <button className="btn" onClick={handleClick}>
        Szövegfájl letöltése
      </button>
    </div>
  );
}

export default InvitationLetterText;
