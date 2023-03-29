"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfGenerator from "./pdf-generator";

function Pdf() {
  return (
    <PDFViewer className="w-screen h-screen m-">
      <PdfGenerator />
    </PDFViewer>
  );
}

export default Pdf;
