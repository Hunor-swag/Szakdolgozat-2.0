import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 50,
    alignItems: "flex-start",
    fontSize: 12,
    fontFamily: "Times-Roman",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },

  imgView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
  },

  image: {
    width: "70px",
  },

  titleContainer: {
    padding: "0 10 0 10",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  mainTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
  },

  subTitle: {
    fontSize: 12,
  },

  committeeDataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    fontFamily: "Times-Roman",
  },

  contentAndTitleContainer: {
    display: "flex",
    flexDirection: "column",
  },

  contentContainer: {
    textAlign: "justify",
  },

  title: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 15,
    fontSize: 14,
    fontFamily: "Roboto",
  },

  content: {
    fontFamily: "Roboto",
  },
});
