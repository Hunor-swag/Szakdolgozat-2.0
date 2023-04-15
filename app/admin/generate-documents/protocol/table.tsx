"use client";
import {
  Document,
  Page,
  View,
  StyleSheet,
  Rect,
  Text,
} from "@react-pdf/renderer";
import { styles } from "./styles-protocol";

function ResultsTable() {
  function generateStaticTableRows(numOfRows: number) {
    let rows = [];
    for (let i = numOfRows; i >= 0; i--) {
      const row = (
        <View style={styles.tableRow}>
          <View style={styles.tableTextCell}>
            <Text>{i} pontot adott</Text>
          </View>
          <View style={styles.tableEmptyCell}></View>
          <View style={styles.tableTextCell}>
            <Text>{i} pontot adott</Text>
          </View>
          <View style={styles.tableEmptyCell}></View>
        </View>
      );
      rows.push(row);
    }
    return rows;
  }

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCellHeader, styles.tableTextCell]}>
          <Text style={{ textDecoration: "underline" }}>ELMÉLETI RÉSZ</Text>
        </View>
        <View style={[styles.tableCellHeader, styles.tableEmptyCell]}>
          <Text>pont</Text>
        </View>
        <View style={[styles.tableCellHeader, styles.tableTextCell]}>
          <Text style={{ textDecoration: "underline" }}>
            DISSZERTÁCIÓS RÉSZ
          </Text>
        </View>
        <View style={[styles.tableCellHeader, styles.tableEmptyCell]}>
          <Text>pont</Text>
        </View>
      </View>
      {generateStaticTableRows(4)}
      <View style={styles.tableRow}>
        <View style={styles.tableTextCell}>
          <Text>Elérhető maximális pont</Text>
        </View>
        <View style={styles.tableEmptyCell}>
          <Text></Text>
        </View>
        <View style={styles.tableTextCell}>
          <Text>Elérhető maximális pont</Text>
        </View>
        <View style={styles.tableEmptyCell}>
          <Text></Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.tableTextCell}>
          <Text>Elért pontok összege</Text>
        </View>
        <View style={styles.tableEmptyCell}>
          <Text></Text>
        </View>
        <View style={styles.tableTextCell}>
          <Text>Elért pontok összege</Text>
        </View>
        <View style={styles.tableEmptyCell}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}

export default ResultsTable;
