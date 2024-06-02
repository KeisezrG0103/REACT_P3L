import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b3b3",
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "16.67%", // Adjusted to fit 6 columns equally
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
  return date ? date.getMonth() + 1 : null;
};

const convertDateToYear = (date) => {
  return date ? date.getFullYear() : null;
};

const PDF_Laporan_Penitip = ({ penitip, selectedDate }) => {
  const currentDate = dayjs().format('DD/MM/YYYY');

  const totalPendapatan = penitip.Produk.reduce((acc, produk) => {
    return acc + (produk.Pendapatan || 0);
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Laporan Transaksi Penitip
          </Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>
            ID Penitip: {penitip.Penitip_ID}
          </Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>
            Nama Penitip: {penitip.Nama_Penitip}
          </Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>
            Bulan: {convertDateToMonth(selectedDate)} Tahun:{" "}
            {convertDateToYear(selectedDate)}
          </Text>
          <Text style={styles.dateText}>Tanggal Cetak: {currentDate}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Nama Produk</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Qty</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Harga Jual</Text>
              </View>
             
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>20% Komisi</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Yang Diterima</Text>
              </View>
            </View>
            {penitip.Produk.length === 0 ? (
              <View style={styles.tableRow}>
                <View style={{ ...styles.tableCol, width: "100%" }}>
                  <Text style={styles.tableCell}>Tidak ada produk yang dijual!</Text>
                </View>
              </View>
            ) : (
              penitip.Produk.map((produk, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{produk.Nama_Produk}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{produk.Total_Produk_Terbeli}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Rp {produk.Harga_Produk.toLocaleString("id-ID")}</Text>
                  </View>           
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Rp {produk.Total.toLocaleString("id-ID")}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Rp {produk.Komisi.toLocaleString("id-ID")}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Rp {produk.Pendapatan.toLocaleString("id-ID")}</Text>
                  </View>
                </View>
              ))
            )}
          
          </View>
          <View style={styles.section}>
              <Text style={{fontSize: 12, marginTop: 20} }>Total: Rp {totalPendapatan.toLocaleString("id-ID")}</Text>
            </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDF_Laporan_Penitip;