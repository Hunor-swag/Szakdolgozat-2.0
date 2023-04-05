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

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

type Props = {
  committee_name: string;
  committee_degree: string;
  committee_rank: string;
  committee_university_name: string;
  committee_department_name: string;
  where: string;
  committee_gender: string;
  student_name: string;
  student_semester: string;
  consultant1: string;
  consultant2: string;
  commission: Object[];
  link_to_online_exam: string;
  exam_date: Date;
  building: string;
  room: string;
  name_of_principal: string;
};

// Create styles

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const InvitationLetterGenerator = (props: Props) => {
  const date = new Date();

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
            {props.committee_name}, {props.committee_degree}
          </Text>
          <Text>{props.committee_rank}</Text>
          <Text>{props.committee_university_name}</Text>
          <Text>{props.committee_department_name}</Text>
          <Text>{props.where}</Text>
        </View>
        <View style={styles.contentAndTitleContainer}>
          <View style={styles.title}>
            <Text>
              Tisztelt {capitalizeFirstLetter(props.committee_rank)}{" "}
              {props.committee_gender === "férfi" ? "Úr" : "Asszony"}!
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              {props.student_name}, a Pannon Egyetem Informatikai Tudományok
              Doktori Iskola {props.student_semester}. féléves PhD hallgatója
              (Témavezetők: {props.consultant1}, {props.consultant2})
              jelentkezett komplex vizsgára. A komplex vizsgára javasolt
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
                {props.commission.map((committee: any) => {
                  return (
                    committee.chairman && (
                      <Text>
                        {committee.name}, {committee.degree}, {committee.rank},{" "}
                        {committee.short_university_name}
                      </Text>
                    )
                  );
                })}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumn1}>
              <Text>Vizsgáztatók:</Text>
            </View>
            <View style={styles.tableColumn2}>
              {props.commission.map((committee: any) => {
                return (
                  committee.examiner && (
                    <Text>
                      {committee.name}, {committee.degree}, {committee.rank},{" "}
                      {committee.short_university_name} {"\n"}
                      {committee.subject} {"\n"}
                    </Text>
                  )
                );
              })}
            </View>
            dsf
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumn1}>
              <Text>Tagok:</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text>
                {props.commission.map((committee: any) => {
                  return (
                    committee.member && (
                      <Text>
                        {committee.name}, {committee.degree}, {committee.rank},{" "}
                        {committee.short_university_name} {"\n"}
                      </Text>
                    )
                  );
                })}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.plainText}>
            A komplex vizsgán való részvételt mind személyes, mind online Teams
            formájában biztosítjuk, utóbbit az alábbi címen:
          </Text>
          <Link src={props.link_to_online_exam}>Link{"\n"}</Link>
          <Text style={{ ...styles.plainText, fontFamily: "Times-Bold" }}>
            A komplex vizsgára {getDateString(props.exam_date)} órai kezdettel
            az Egyetem {props.building} épületének {props.room} számú termében
            kerül sor.
          </Text>
          <Text style={styles.plainText}>
            Veszprém, {getDateString(new Date("January 12, 2023 13:00"))}.
          </Text>
          <View style={styles.signatureContainer}>
            <Text>{props.name_of_principal}</Text>
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

export default InvitationLetterGenerator;
