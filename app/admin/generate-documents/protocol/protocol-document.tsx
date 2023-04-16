import {
  Page,
  Text,
  View,
  Image,
  Document,
  Font,
  Link,
} from "@react-pdf/renderer";
import { styles } from "./styles-protocol";
import EBGaramondRegular from "../../../../public/fonts/EBGaramond-Regular.ttf";
import EBGaramondBold from "../../../../public/fonts/EBGaramond-Bold.ttf";
import { Committee, Consultant, Exam } from "../../../../types/typings";
import ResultsTable from "./table";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";

Font.register({
  family: "Garamond",
  src: EBGaramondRegular,
});

Font.register({
  family: "Garamond-Bold",
  src: EBGaramondBold,
});

export function generateDots(numOfLines: number) {
  let dots = "";
  for (let i = 0; i < numOfLines; i++) {
    for (let j = 0; j < 180; j++) dots += ".";
    dots += "\n";
  }
  return <Text style={styles.dotlines}>{dots}</Text>;
}

export function displayCommitteeData(person: Committee) {
  return `${person.lastname} ${person.firstname}, ${person.degree}, ${
    person.uni_role
  }, ${person.institution_name}${"\n"}`;
}

export function displayConsultantData(person: Consultant) {
  return `${person.lastname} ${person.firstname}, ${person.degree}, ${
    person.uni_role
  }, ${person.institution_name}${"\n"}`;
}

function ProtocolDocument({ exam }: { exam: Exam }) {
  return (
    <Document style={styles.document}>
      <Page1 exam={exam} />
      <Page2 />
      <Page3 exam={exam} />
    </Document>
  );
}

export default ProtocolDocument;
