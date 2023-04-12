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
import EBGaramondRegular from "../../../public/fonts/EBGaramond-Regular.ttf";
import EBGaramondBold from "../../../public/fonts/EBGaramond-Bold.ttf";
import { Committee, Consultant, Exam } from "../../../types/typings";

Font.register({
  family: "Garamond",
  src: EBGaramondRegular,
});

Font.register({
  family: "Garamond-Bold",
  src: EBGaramondBold,
});

function generateDots(numOfLines: number) {
  let dots = "";
  for (let i = 0; i < numOfLines; i++) {
    for (let j = 0; j < 180; j++) dots += ".";
    dots += "\n";
  }
  return <Text style={styles.dotlines}>{dots}</Text>;
}

function displayCommitteeData(person: Committee) {
  return `${person.lastname} ${person.firstname}, ${person.degree}, ${
    person.uni_role
  }, ${person.institution_name}${"\n"}`;
}

function displayConsultantData(person: Consultant) {
  return `${person.lastname} ${person.firstname}, ${person.degree}, ${
    person.uni_role
  }, ${person.institution_name}${"\n"}`;
}

function ProtocolDocument({ exam }: { exam: Exam }) {
  const chairman = exam.commission[0];

  return (
    <Document style={styles.document}>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            <Text style={{ fontFamily: "Garamond-Bold" }}>Pannon Egyetem</Text>
            <Text>Nyilvántartási szám: .........</Text>
          </View>
          <View style={styles.headerItem}>
            <Text>Oklevélszám: .........</Text>
          </View>
        </View>
        <View style={styles.titles}>
          <Text style={styles.title}>Jegyzőkönyv</Text>
          <Text style={styles.second_title}>
            Informatikai Tudományok Doktori Iskola
          </Text>
        </View>
        <View style={styles.subject_content}>
          <Text style={styles.student_data}>
            <Text style={{ textDecoration: "underline" }}>Tárgy:</Text>{" "}
            {exam.student.lastname} {exam.student.firstname} okleveles{" "}
            {exam.student.degree} ({exam.student.birth_city},{" "}
            {exam.student.birth_date}) Komplex vizsgája
          </Text>
          <Text>
            A komplex vizsga helyszíne: Veszprém, Pannon Egyetem, {} épület {}.
          </Text>
          <Text>
            A komplex vizsga időpontja: {exam.date} {exam.time}
          </Text>
        </View>
        <View style={styles.commission_content}>
          <Text style={{ textDecoration: "underline", marginBottom: 10 }}>
            Jelen vannak:
          </Text>
          <View>
            <Text style={styles.commission_roles}>A bizottság elnöke:</Text>
            <View style={styles.committee_data_container}>
              <Text style={styles.committee_role_container}></Text>
              <Text>{displayCommitteeData(chairman)}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.commission_roles}>A bizottság tagjai:</Text>
            <View style={styles.committee_data_container}>
              <Text style={styles.committee_role_container}>
                Az I. tárgy kérdezője:
              </Text>
              <Text>
                {exam.commission.map((committee: Committee) => {
                  if (committee.main_subj_examiner) {
                    return displayCommitteeData(committee);
                  }
                })}
              </Text>
            </View>
            <View style={styles.committee_data_container}>
              <Text style={styles.committee_role_container}>
                A II. tárgy kérdezője:
              </Text>
              <Text>
                {exam.commission.map((committee: Committee) => {
                  if (committee.other_subj_examiner) {
                    return displayCommitteeData(committee);
                  }
                })}
              </Text>
            </View>
            <View style={styles.committee_data_container}>
              <Text style={styles.committee_role_container}>Tagok:</Text>
              <Text>
                {exam.commission.map((committee: Committee, index: number) => {
                  if (
                    !committee.other_subj_examiner &&
                    !committee.main_subj_examiner &&
                    index !== 0
                  ) {
                    return displayCommitteeData(committee);
                  }
                })}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontFamily: "Garamond-Bold" }}>Témavezetők:</Text>
            <View style={styles.committee_data_container}>
              <Text style={styles.committee_role_container}></Text>
              <Text>
                {displayConsultantData(exam.student.consultant1)}
                {exam.student.consultant2 &&
                  displayConsultantData(exam.student.consultant2)}
              </Text>
            </View>
          </View>
          <Text>
            Jegyzőkönyvvezető: {"\t"} {exam.protocol_writer}
          </Text>
        </View>

        <View>
          <Text>
            I. tárgy: {exam.main_subject}
            {"\n"}
          </Text>
          {generateDots(5)}
        </View>
      </Page>
    </Document>
  );
}

export default ProtocolDocument;
