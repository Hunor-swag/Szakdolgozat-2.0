import { Text, View } from "@react-pdf/renderer";
import { Exam } from "../../../../types/typings";
import { styles } from "./styles-protocol";

function Classification({ exam }: { exam: Exam }) {
  return (
    <View style={styles.classification_container}>
      <View style={styles.classification_center}>
        <Text>Az elméleti és disszertációs rész minősítése:</Text>
      </View>
      <View style={styles.classification_around}>
        <View style={styles.classification_column_center}>
          <Text>..................%</Text>
          <Text>megfelelt/nem felelt meg</Text>
        </View>
        <View style={styles.classification_column_center}>
          <Text>..................%</Text>
          <Text>megfelelt/nem felelt meg</Text>
        </View>
      </View>
      <View style={styles.classification_center}>
        <Text>.........................................</Text>
        <Text>{`${exam.commission[0].lastname} ${exam.commission[0].firstname}`}</Text>
        <Text>a Bizottság elnöke</Text>
      </View>
      <View style={styles.classification_around}>
        <View style={styles.classification_column_center}>
          <Text>.........................................</Text>
          {exam.commission.map((person, index) => {
            if (person.main_subj_examiner) {
              return (
                <Text
                  key={index}
                >{`${person.lastname} ${person.firstname}`}</Text>
              );
            }
          })}
          <Text>a főtárgy vizsgáztatója</Text>
        </View>
        <View style={styles.classification_column_center}>
          <Text>.........................................</Text>
          {exam.commission.map((person, index) => {
            if (person.other_subj_examiner) {
              return (
                <Text
                  key={index}
                >{`${person.lastname} ${person.firstname}`}</Text>
              );
            }
          })}
          <Text>a melléktárgy vizsgáztatója</Text>
        </View>
      </View>
      <View style={styles.classification_around}>
        {exam.commission.map((person, index) => {
          if (
            index !== 0 &&
            !person.main_subj_examiner &&
            !person.other_subj_examiner
          ) {
            return (
              <View key={index} style={styles.classification_column_center}>
                <Text>.........................................</Text>
                <Text>{`${person.lastname} ${person.firstname} - tag`}</Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}

export default Classification;
