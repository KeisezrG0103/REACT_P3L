import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLaporanProdukPerBulan } from "../../api/laporan/laporan_query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF_Laporan_penjualan_produk from "../../components/PDF_Laporan_penjualan_produk";

const Laporan_Penjualan_Produk = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const convertDateToMonth = (date) => {
    return date.getMonth() + 1;
  };

  const convertDateToYear = (date) => {
    return date.getFullYear();
  };

  const { data, isLoading, error } = useQuery(
    [
      "laporanProduk",
      convertDateToMonth(selectedDate),
      convertDateToYear(selectedDate),
    ],
    () =>
      getLaporanProdukPerBulan(
        convertDateToMonth(selectedDate),
        convertDateToYear(selectedDate)
      )
  );

  const totalUang = data?.data.reduce((acc, item) => acc + item.Total, 0) || 0;

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex flex-col md:flex-row md:justify-between md:w-full space-y-4 md:space-y-0">
          <div className="flex items-start space-y-4 flex-col">
            <h1 className="font-bold text-2xl">Laporan Penjualan per Produk</h1>
            <div className="form-control">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="input"
              />
            </div>
          </div>
          <div className="flex items-end">
            <PDFDownloadLink
              document={
                <PDF_Laporan_penjualan_produk
                  data={data}
                  selectedDate={selectedDate}
                />
              }
              fileName="Laporan_Penjualan_Produk.pdf"
              className="btn btn-primary text-white"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div
            className="card-body relative"
            style={{ width: "100%", height: "70vh" }}
          >
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>Produk</th>
                    <th>Kuantitas</th>
                    <th>Harga</th>
                    <th>Jumlah Uang</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="4">Error: {error.message}</td>
                    </tr>
                  )}

                  {data?.data.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}

                  {data?.data.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>{item.Nama_Produk}</td>
                      <td>{item.Kuantitas}</td>
                      <td>{item.Harga}</td>
                      <td>{item.Total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full mt-5">
                <div className="flex justify-end p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-bold">Total Jumlah Uang:</h2>
                  <span className="text-lg font-semibold ml-2">
                    Rp {totalUang.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="join flex justify-center mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Penjualan_Produk;
