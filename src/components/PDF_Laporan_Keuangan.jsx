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
    width: "50%", // Adjusted to fit new structure
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

const PDF_Laporan_Keuangan = ({ data, selectedDate }) => {
  const totalPenjualan = data?.data?.penjualan?.TotalPenjualan || 0;
  const totalTip = data?.data?.penjualan?.TotalTip || 0;
  const totalPengeluaranLain = Array.isArray(data?.data?.pengeluaranLain) ? data?.data?.pengeluaranLain?.reduce((acc, item) => acc + item.Harga, 0) || 0 : 0;
  const totalPengadaanBahanBaku = data?.data?.totalPengadaanBahanBaku?.TotalPengadaanBahanBaku || 0;
  const totalPembayaranPenitip = data?.data?.totalPembayaranPenitip?.TotalPembayaranPenitip || 0;
  const totalGajiKaryawan = data?.data?.totalGajiKaryawan || 0;

  const totalPemasukan = totalPenjualan + totalTip;
  const totalPengeluaran = totalGajiKaryawan + totalPengadaanBahanBaku + totalPembayaranPenitip + totalPengeluaranLain;

  const currentDate = dayjs().format('DD/MM/YYYY');

  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Laporan Pemasukan dan Pengeluaran</Text>
          <Text>Bulan: {convertDateToMonth(selectedDate)} Tahun: {convertDateToYear(selectedDate)}</Text>
          <Text style={styles.dateText}>Tanggal Cetak: {currentDate}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Item</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Pemasukan</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Pengeluaran</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Penjualan</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalPenjualan.toLocaleString("id-ID")}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Tip</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalTip.toLocaleString("id-ID")}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Gaji Karyawan</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalGajiKaryawan.toLocaleString("id-ID")}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Bahan Baku</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalPengadaanBahanBaku.toLocaleString("id-ID")}</Text>
              </View>
            </View>
            {Array.isArray(data?.data?.pengeluaranLain) && data?.data?.pengeluaranLain.map((item, index) => (
            <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>{item.Nama_Pengeluaran}</Text>
                </View>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text> 
                </View>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {item.Harga.toLocaleString("id-ID")}</Text>
                </View>
            </View>
            ))}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Pembayaran ke Penitip</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalPembayaranPenitip.toLocaleString("id-ID")}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalPemasukan.toLocaleString("id-ID")}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rp {totalPengeluaran.toLocaleString("id-ID")}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF_Laporan_Keuangan;