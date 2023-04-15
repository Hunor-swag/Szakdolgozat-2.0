"use client";

import {
  Page,
  Text,
  View,
  Image,
  Document,
  Font,
  Link,
} from "@react-pdf/renderer";
import { styles } from "./styles-invitation-letter";
import { getDateString } from "../../../functions/getDateString";
import { Committee, Exam } from "../../../types/typings";

type Props = {
  exam: Exam;
  committee: Committee;
};

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

// Create styles

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const InvitationLetterDocument = ({ exam, committee }: Props) => {
  const date = new Date();
  console.log(exam.student.consultant2);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.imgView}>
            <Image style={styles.image} src="/pe_cimer.png" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Pannon Egyetem</Text>
            <Text style={styles.subTitle}>
              Informatikai Tudományok Doktori Iskola
            </Text>
          </View>
        </View>
        <View style={styles.committeeDataContainer}>
          <Text style={{ fontFamily: "Times-Bold" }}>
            {committee.firstname} {committee.lastname}, {committee.degree}
          </Text>
          <Text>{committee.uni_role}</Text>
          <Text>{committee.institution_name}</Text>
          <Text>{committee.department_name}</Text>
          <Text>{exam.venue === "" ? "Online" : "Helyben"}</Text>
        </View>
        <View style={styles.contentAndTitleContainer}>
          <View style={styles.title}>
            <Text>
              Tisztelt {capitalizeFirstLetter(committee.uni_role)} Asszony/Úr!
              {"\n"}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              {exam.student.lastname} {exam.student.lastname}, a Pannon Egyetem
              Informatikai Tudományok Doktori Iskola PhD hallgatója
              (Témavezető(k): {exam.student.consultant1.lastname}{" "}
              {exam.student.consultant1.firstname}
              {exam.student.consultant2 &&
                ", " +
                  exam.student.consultant2.lastname +
                  " " +
                  exam.student.consultant2.firstname}
              ) jelentkezett komplex vizsgára. A komplex vizsgára javasolt
              bizottságot a Doktori Iskola Tanácsa elfogadta. {"\n"}
              A Doktori Iskola Tanácsa javaslatát elfogadva kérdem, hogy az
              alábbiakban részletezett Komplex Vizsga Bizottságba történő
              felkérést elfogadni, és a vizsga lebonyolításában részt venni
              szíveskedjék. <br />
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontFamily: "Times-Bold" }}>
            Komplex vizsga bizottság:
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColumn1}>
              <Text>Elnök:</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text>
                <Text>
                  {exam.commission[0].lastname} {exam.commission[0].firstname},{" "}
                  {exam.commission[0].degree}, {exam.commission[0].uni_role},{" "}
                  {exam.commission[0].short_institution_name}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumn1}>
              <Text>Vizsgáztatók:</Text>
            </View>
            <View style={styles.tableColumn2}>
              {exam.commission.map((committee: Committee, index: number) => {
                if (committee.main_subj_examiner)
                  return (
                    <Text key={index}>
                      {committee.lastname} {committee.firstname},{" "}
                      {committee.degree}, {committee.uni_role},{" "}
                      {committee.short_institution_name} {"\n"}
                      {exam.main_subject} {"\n"}
                    </Text>
                  );
                if (committee.other_subj_examiner)
                  return (
                    <Text key={index}>
                      {committee.lastname} {committee.firstname},{" "}
                      {committee.degree}, {committee.uni_role},{" "}
                      {committee.short_institution_name} {"\n"}
                      {exam.other_subject} {"\n"}
                    </Text>
                  );
              })}
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumn1}>
              <Text>Tagok:</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text>
                {exam.commission.map((committee: any, index: number) => {
                  if (
                    !committee.main_subj_examiner &&
                    !committee.other_subj_examiner &&
                    index !== 0
                  )
                    return (
                      <Text key={index}>
                        {committee.lastname} {committee.firstname},{" "}
                        {committee.degree}, {committee.uni_role},{" "}
                        {committee.short_institution_name} {"\n"}
                      </Text>
                    );
                })}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.plainText}>
            A komplex vizsgán való részvételt mind személyes, mind online Teams
            formájában biztosítjuk
            {/* , utóbbit az alábbi címen: */}
          </Text>
          <Link src={exam.link}>Link{"\n"}</Link>
          <Text style={{ ...styles.plainText, fontFamily: "Times-Bold" }}>
            A komplex vizsgára {getDateString(new Date(exam.date), true)} órai
            kezdettel az Egyetem {exam.building} épületének {exam.room} számú
            termében kerül sor.
          </Text>
          <Text style={styles.plainText}>
            Veszprém, {getDateString(new Date(Date.now()), false)}
          </Text>
          <View style={styles.signatureContainer}>
            <Text>Dr. Hartung Ferenc</Text>
            <Text>a Doktori Iskola vezetője</Text>
          </View>
        </View>
        <View style={styles.footNote}>
          <Text style={{ fontFamily: "Times-Bold", marginTop: 2 }}>
            Pannon Egyetem • University of Pannonia
          </Text>
          <Text style={{ fontFamily: "Times-Italic", marginTop: 2 }}>
            Informatikai Tudományok Doktori Iskola • Doctoral School of
            Information Science and Technology{" "}
          </Text>
          <Text style={{ fontFamily: "Times-Roman", marginTop: 2 }}>
            8200 Veszprém, Egyetem utca 10.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvitationLetterDocument;
