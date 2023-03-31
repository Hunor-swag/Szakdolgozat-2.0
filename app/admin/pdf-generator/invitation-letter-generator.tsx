"use client";

import { Page, Text, View, Image, Document, Font } from "@react-pdf/renderer";
import { styles } from "./styles-invitation-letter";
import { NextPage } from "next";

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
};

// Create styles

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const InvitationLetterGenerator = (props: Props) => {
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
              (Témavezetők: {props.consultant1} {props.consultant2})
              jelentkezett komplex vizsgára. A komplex vizsgára javasolt
              bizottságot a Doktori Iskola Tanácsa elfogadta. {"\n"}
              A Doktori Iskola Tanácsa javaslatát elfogadva kérdem, hogy az
              alábbiakban részletezett Komplex Vizsga Bizottságba történő
              felkérést elfogadni, és a vizsga lebonyolításában részt venni
              szíveskedjék. <br />
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvitationLetterGenerator;
