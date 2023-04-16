import { saveAs } from "file-saver";
import { Exam } from "../../../../types/typings";
import generateHtml from "./generateHtml";

export function downloadHTMLFile(exam: Exam) {
  const htmlContent = generateHtml(exam);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  saveAs(
    blob,
    `${exam.student.lastname}-${exam.student.firstname}-vizsga.html`
  );
}
