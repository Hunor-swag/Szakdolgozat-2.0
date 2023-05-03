"use client";

import Link from "next/link";
import { useFetch } from "../../../hooks/useFetch";
import { Exam } from "../../../types/typings";
import { downloadHTMLFile } from "./exam-html/downloadHTMLFile";

function GenerateDocuments() {
  const { data: examsData, error } = useFetch("/api/exams");
  const exams = examsData as Exam[];

  return (
    <div className="flex justify-center">
      <div className="table border-collapse">
        <div className="table-row border-b-4 border-slate-500 font-bold">
          <div className="table-cell">Hallgató</div>
          <div className="table-cell">Felkérőlevelek (txt)</div>
          <div className="table-cell">Meghívólevelek (pdf)</div>
          <div className="table-cell">Jegyzőkönyv (pdf)</div>
          <div className="table-cell">Vizsgaleírás (html)</div>
        </div>
        {exams.map((exam, index) => {
          return (
            <div key={index} className="table-row">
              <div className="table-cell">{exam.student.name}</div>
              <div className="table-cell">
                <div className="flex justify-center items-center">
                  <Link
                    href={{
                      pathname:
                        "/admin/generate-documents/invitation-letter-text",
                      query: {
                        exam: JSON.stringify(exam),
                      },
                    }}
                  >
                    <button className="btn">Generálás</button>
                  </Link>
                </div>
              </div>
              <div className="table-cell">
                <div className="flex justify-center items-center">
                  <Link
                    href={{
                      pathname: "/admin/generate-documents/invitation-letter",
                      query: {
                        exam: JSON.stringify(exam),
                      },
                    }}
                  >
                    <button className="btn">Generálás</button>
                  </Link>
                </div>
              </div>
              <div className="table-cell">
                <div className="flex justify-center items-center">
                  <Link
                    href={{
                      pathname: "/admin/generate-documents/protocol/pdf",
                      query: {
                        exam: JSON.stringify(exam),
                      },
                    }}
                  >
                    <button className="btn" type="submit">
                      Generálás
                    </button>
                  </Link>
                </div>
              </div>
              <div className="table-cell">
                <div className="flex justify-center items-center">
                  <button
                    className="btn"
                    onClick={() => downloadHTMLFile(exam)}
                  >
                    Letöltés
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenerateDocuments;
