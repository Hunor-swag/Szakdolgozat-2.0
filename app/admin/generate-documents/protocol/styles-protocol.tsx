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
  commission_decision_title: {
    fontFamily: "Garamond-Bold",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  table: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  tableTextCell: {
    width: "40%",
    padding: 5,
    fontSize: 10,
    borderLeft: "1px solid black",
    borderCollapse: "collapse",
  },
  tableEmptyCell: {
    width: "10%",
    padding: 5,
    fontSize: 10,
    borderLeft: "1px solid black",
    borderCollapse: "collapse",
  },

  tableCellHeader: {
    padding: 5,
    fontSize: 12,
    borderLeft: "1px solid black",
    paddingBottom: 15,
  },

  classification_container: {},

  classification_center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  classification_around: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 15,
  },

  classification_column_center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  commission_content: {},
});
