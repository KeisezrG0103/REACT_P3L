import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
  },
});

const PDF_Laporan_stok_bahan_baku = ({ data }) => {
  const formattedDate = data?.date
    ? format(new Date(data.date), "dd-MM-yyyy")
    : "N/A";

  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <View>
          <Text style={styles.title}>Laporan Stok Bahan Baku</Text>
          <Text style={styles.dateText}>Tanggal Cetak: {formattedDate}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Nama</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Satuan</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Qty</Text>
            </View>
          </View>
          {data?.data?.length > 0 ? (
            data.data.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.Nama}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.Satuan}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.Qty}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>No data available</Text>
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PDF_Laporan_stok_bahan_baku;
