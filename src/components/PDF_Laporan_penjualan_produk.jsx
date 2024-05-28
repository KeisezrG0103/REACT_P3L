import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    width: "25%",
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
});

const convertDateToMonth = (date) => {
  return date.getMonth() + 1;
};

const convertDateToYear = (date) => {
  return date.getFullYear();
};

const PDF_Laporan_penjualan_produk = ({ data, selectedDate }) => {
  // Ensure data is available and not null or undefined
  const totalUang = data?.data?.reduce((acc, item) => acc + item.Total, 0) || 0;

  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Laporan Penjualan per Produk
          </Text>
          <Text style={{ fontSize: 12 }}>
            Bulan: {convertDateToMonth(selectedDate)} Tahun:{" "}
            {convertDateToYear(selectedDate)}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Produk</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Kuantitas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Harga</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Jumlah Uang</Text>
            </View>
          </View>
          {data?.data?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Nama_Produk}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Kuantitas}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Harga}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Total}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {totalUang.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF_Laporan_penjualan_produk;
