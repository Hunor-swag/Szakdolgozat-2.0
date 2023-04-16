import { Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { generateDots } from "./protocol-document";
import ResultsTable from "./table";
import { styles } from "./styles-protocol";
import Classification from "./classification";
import { Exam } from "../../../../types/typings";

function Page3({ exam }: { exam: Exam }) {
  return (
    <Page style={styles.page}>
      <View>
        <Text style={styles.commission_decision_title}>
          A bizottság döntése:{"\n"}
        </Text>
        <Text>
          Szöveges értékelés:
          {"\n"}
        </Text>
        {generateDots(6)}
      </View>
      <ResultsTable />
      <Classification exam={exam} />
    </Page>
  );
}

export default Page3;
