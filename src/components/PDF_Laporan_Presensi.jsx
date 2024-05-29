import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "20%", // Adjusted to fit new structure
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
  },
  tableColTotal: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
  },
  tableCell: { margin: "auto", fontSize: 10, padding: 5 },
  dateText: {
    fontSize: 12,
    marginTop: 10,
  },
});

const convertDateToMonth = (date) => {
  return date.getMonth() + 1;
};

const convertDateToYear = (date) => {
  return date.getFullYear();
};

const PDF_Laporan_Presensi = ({ data, selectedDate }) => {
  const totalUang = data?.data?.reduce((acc, item) => acc + (item.Total || 0), 0) || 0;
  const currentDate = dayjs().format('DD/MM/YYYY');

  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Laporan Presensi
          </Text>
          <Text style={{ fontSize: 12 }}>
            Bulan: {convertDateToMonth(selectedDate)} Tahun:{" "}
            {convertDateToYear(selectedDate)}
          </Text>
          <Text style={styles.dateText}>Tanggal Cetak: {currentDate}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Nama</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Jumlah Hadir</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Jumlah Bolos</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Honor Harian</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Bonus Rajin</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          {data?.data?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Nama}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Jumlah_Hadir}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Jumlah_Bolos}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Honor_Harian}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Bonus}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Total}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableColTotal}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rp {totalUang.toLocaleString("id-ID")}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF_Laporan_Presensi;