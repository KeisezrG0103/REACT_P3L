import React, { useState } from "react";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLaporanPresensiPerBulan } from "../../api/laporan/laporan_query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF_Laporan_Presensi from "../../components/PDF_Laporan_Presensi";
import dayjs from 'dayjs';

const Laporan_Presensi = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateForAPI = (date) => {
    return dayjs(date).format('YYYY-MM');
  };

  const { data, isLoading, error } = useQuery(
    ["laporanPresensi", selectedDate],
    () => getLaporanPresensiPerBulan(formatDateForAPI(selectedDate))
  );

  const totalUang = data?.data.reduce((acc, item) => acc + (item.Total || 0), 0) || 0;

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex flex-col md:flex-row md:justify-between md:w-full space-y-4 md:space-y-0">
          <div className="flex items-start space-y-4 flex-col">
            <h1 className="font-bold text-2xl">Laporan Presensi Bulanan</h1>
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
                <PDF_Laporan_Presensi
                  data={data}
                  selectedDate={selectedDate}
                />
              }
              fileName="Laporan_Presensi.pdf"
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
                    <th>Nama</th>
                    <th>Jumlah Hadir</th>
                    <th>Jumlah Bolos</th>
                    <th>Honor Harian</th>
                    <th>Bonus Rajin</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="6">Loading...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="6">Error: {error.message}</td>
                    </tr>
                  )}

                  {data?.data.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}

                  {data?.data.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>{item.Nama}</td>
                      <td>{item.Jumlah_Hadir}</td>
                      <td>{item.Jumlah_Bolos}</td>
                      <td>{item.Honor_Harian}</td>
                      <td>{item.Bonus}</td>
                      <td>{item.Total}</td>
                    </tr>
                  ))}
                  <tr className="text-center font-bold text-xl">
                    <td colSpan="5">Total</td>
                    <td>Rp {totalUang.toLocaleString("id-ID")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="join flex justify-center mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Presensi;