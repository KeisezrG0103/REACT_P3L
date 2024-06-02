import React, { useState } from "react";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLaporanKeuanganPerBulan } from "../../api/laporan/laporan_query";
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF_Laporan_Keuangan from "../../components/PDF_Laporan_Keuangan";
import './tab.css';

const Laporan_Keuangan = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateForAPI = (date) => {
    return dayjs(date).format('YYYY-MM');
  };

  const { data, isLoading, error } = useQuery(
    ["laporanKeuangan", selectedDate],
    () => getLaporanKeuanganPerBulan(formatDateForAPI(selectedDate))
  );

  const totalPenjualan = data?.data?.penjualan?.TotalPenjualan || 0;
  const totalTip = data?.data?.penjualan?.TotalTip || 0;
  const totalPengeluaranLain = data?.data?.pengeluaranLain?.reduce((acc, item) => acc + item.Harga, 0) || 0;
  const totalPengadaanBahanBaku = data?.data?.totalPengadaanBahanBaku?.TotalPengadaanBahanBaku || 0;
  const totalPembayaranPenitip = data?.data?.totalPembayaranPenitip?.TotalPembayaranPenitip || 0;
  const totalGajiKaryawan = data?.data?.totalGajiKaryawan?.TotalGajiKaryawan || 0;

  const totalPemasukan = totalPenjualan + totalTip;
  const totalPengeluaran = totalGajiKaryawan + totalPengadaanBahanBaku + totalPembayaranPenitip + totalPengeluaranLain;

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex flex-col md:flex-row md:justify-between md:w-full space-y-4 md:space-y-0">
          <div className="flex items-start space-y-4 flex-col">
            <h1 className="font-bold text-2xl">Laporan Keuangan Bulanan</h1>
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
                <PDF_Laporan_Keuangan
                  data={data}
                  selectedDate={selectedDate}
                />
              }
              fileName="Laporan_Keuangan.pdf"
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
          <div className="card-body relative" style={{ width: "100%", height: "70vh" }}>
            <Tabs>
              <TabList>
                <Tab>Pemasukan</Tab>
                <Tab>Pengeluaran</Tab>
              </TabList>

              <TabPanel>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th>Nama</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && (
                        <tr>
                          <td colSpan="2">Loading...</td>
                        </tr>
                      )}
                      {error && (
                        <tr>
                          <td colSpan="2">Error: {error.message}</td>
                        </tr>
                      )}
                      <tr className="text-center">
                        <td>Penjualan</td>
                        <td>Rp {totalPenjualan.toLocaleString("id-ID")}</td>
                      </tr>
                      <tr className="text-center">
                        <td>Tip</td>
                        <td>Rp {totalTip.toLocaleString("id-ID")}</td>
                      </tr>
                      <tr className="text-center font-bold text-lg">
                        <td>Total Pemasukan</td>
                        <td>Rp {totalPemasukan.toLocaleString("id-ID")}</td>
                      </tr>
                      {!isLoading && !error && data?.data.length === 0 && (
                        <tr>
                          <td colSpan="2" className="text-center">
                            Data tidak ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th>Nama</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && (
                        <tr>
                          <td colSpan="2">Loading...</td>
                        </tr>
                      )}
                      {error && (
                        <tr>
                          <td colSpan="2">Error: {error.message}</td>
                        </tr>
                      )}
                      <tr className="text-center">
                        <td>Gaji Karyawan</td>
                        <td>Rp {totalGajiKaryawan.toLocaleString("id-ID")}</td>
                      </tr>
                      <tr className="text-center">
                        <td>Bahan Baku</td>
                        <td>Rp {totalPengadaanBahanBaku.toLocaleString("id-ID")}</td>
                      </tr>
                      {data?.data?.pengeluaranLain?.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td>{item.Nama_Pengeluaran}</td>
                          <td>Rp {item.Harga.toLocaleString("id-ID")}</td>
                        </tr>
                      ))}
                      <tr className="text-center">
                        <td>Pembayaran ke Penitip</td>
                        <td>Rp {totalPembayaranPenitip.toLocaleString("id-ID")}</td>
                      </tr>
                    
                    
                      <tr className="text-center font-bold text-lg">
                        <td>Total Pengeluaran</td>
                        <td>Rp {totalPengeluaran.toLocaleString("id-ID")}</td>
                      </tr>
                      {!isLoading && !error && data?.data.length === 0 && (
                        <tr>
                          <td colSpan="2" className="text-center">
                            Data tidak ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="join flex justify-center mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Keuangan;