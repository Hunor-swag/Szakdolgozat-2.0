"use client";

import { Page, View, Text } from "@react-pdf/renderer";
import { getDateString } from "../../../../functions/getDateString";
import { Committee, Exam } from "../../../../types/typings";
import {
  displayCommitteeData,
  displayConsultantData,
  generateDots,
} from "./protocol-document";
import { styles } from "./styles-protocol";

function Page1({ exam }: { exam: Exam }) {
  const chairman = exam.commission[0];
  return (
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
          {exam.student.faculty_name.toLowerCase()} (
          {getDateString(new Date(exam.student.birth_date))}) Komplex vizsgája
        </Text>
        <Text>
          A komplex vizsga helyszíne: Veszprém, Pannon Egyetem, {exam.building}{" "}
          épület {exam.room}.
        </Text>
        <Text>
          A komplex vizsga időpontja: {getDateString(new Date(exam.date), true)}
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
        <Text>Jegyzőkönyvvezető: {exam.protocol_writer}</Text>
      </View>

      <View>
        <Text>
          I. tárgy:{" "}
          <Text style={{ fontFamily: "Garamond-Bold" }}>
            {exam.main_subject}
          </Text>
          {"\n"}
        </Text>
        {generateDots(5)}
      </View>

      <View>
        <Text>
          II. tárgy:{" "}
          <Text style={{ fontFamily: "Garamond-Bold" }}>
            {exam.other_subject}{" "}
          </Text>
          {"\n"}
        </Text>
        {generateDots(5)}
      </View>
    </Page>
  );
}

export default Page1;
