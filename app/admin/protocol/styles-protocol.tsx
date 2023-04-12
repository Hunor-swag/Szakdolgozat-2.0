import { Font } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  document: {
    fontSize: 12,
  },
  page: {
    padding: 50,
    fontFamily: "Garamond",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
    marginBottom: 30,
  },
  headerItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "30%",
  },
  titles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "Garamond-Bold",
    marginBottom: 10,
    fontSize: 15,
  },
  second_title: {
    marginBottom: 13,
  },
  subject_content: {
    marginBottom: 20,
  },
  student_data: {
    marginBottom: 20,
  },
  commission_roles: {
    fontFamily: "Garamond-Bold",
    marginBottom: 10,
  },
  committee_data_container: {
    display: "flex",
    flexDirection: "row",
  },
  committee_role_container: {
    width: "30%",
  },
  dotlines: {
    marginTop: 4,
  },
});
