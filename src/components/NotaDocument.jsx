import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import logo from "../assets/logo.png";
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textCenter: {
    textAlign: "center",
  },
});

const NotaDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Atma Kitchen</Text>
        <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
      </View>
      {data?.Nota.map((item, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.detail}>
            <Text>No Nota:</Text>
            <Text>{item.NoNota}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Tanggal Pesan:</Text>
            <Text>{item.TanggalPesan}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Lunas Pada:</Text>
            <Text>{item.TanggalPelunasan || "-"}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Tanggal Ambil:</Text>
            <Text>{item.TanggalDiambil}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Email:</Text>
            <Text>{item.Email}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Alamat:</Text>
            <Text>{item.Alamat || "-"}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Delivery:</Text>
            <Text>{item.JasaPengiriman || "-"}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Nama Produk</Text>
            <Text>Qty</Text>
            <Text>Harga</Text>
          </View>
          {data?.DetailPesanan.map((detailItem, detailIndex) => (
            <View key={detailIndex} style={styles.detail}>
              <Text style={styles.textCenter}>
                {detailItem.Nama_Produk || detailItem.Nama_Hampers}
              </Text>
              <Text style={styles.textCenter}>{detailItem.Total_Produk}</Text>
              <Text style={styles.textCenter}>
               Rp. {detailItem.Harga_Produk || detailItem.Harga_Hampers}
              </Text>
            </View>
          ))}
          <View style={styles.detail}>
            <Text>Total</Text>
            <Text>Rp. {item.Total_Raw}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Ongkir</Text>
            <Text>{item.OngkosKirim ? `Rp. ${item.OngkosKirim}` : "-"}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Total</Text>
            <Text>Rp. {item.Total_Raw + (item.OngkosKirim || 0)}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Potongan Poin</Text>
            <Text>Rp. {item.PenggunaanPoin}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Total</Text>
            <Text>Rp. {item.Total}</Text>
          </View>
          <View style={styles.detail}>
            <Text>Poin Yang didapat</Text>
            <Text>{item.PoinDidapat} Poin</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default NotaDocument;
