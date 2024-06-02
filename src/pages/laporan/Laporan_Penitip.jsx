import React, { useState } from "react";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLaporanPenitipPerBulan } from "../../api/laporan/laporan_query";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDF_Laporan_Penitip from "../../components/PDF_Laporan_Penitip";
import dayjs from 'dayjs';

const Laporan_Penitip = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateForAPI = (date) => {
    return dayjs(date).format('YYYY-MM');
  };

  const { data, isLoading, error } = useQuery(
    ["laporanPenitip", selectedDate],
    () => getLaporanPenitipPerBulan(formatDateForAPI(selectedDate))
  );

  const totalUang = data?.data?.reduce((acc, penitip) => {
    return acc + penitip.Produk.reduce((sum, produk) => sum + (produk.Pendapatan || 0), 0);
  }, 0) || 0;

  const handleGeneratePDFs = async () => {
    if (data?.data) {
      for (const penitip of data.data) {
        const pdfDoc = (
          <PDF_Laporan_Penitip penitip={penitip}
          selectedDate={selectedDate} />
        );
        const asPdf = pdf(pdfDoc);
        const blob = await asPdf.toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Laporan_${penitip.Nama_Penitip}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex flex-col md:flex-row md:justify-between md:w-full space-y-4 md:space-y-0">
          <div className="flex items-start space-y-4 flex-col">
            <h1 className="font-bold text-2xl">Laporan Transaksi Penitip Bulanan</h1>
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
            <button onClick={handleGeneratePDFs} className="btn btn-primary text-white">
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%", height: "70vh" }}>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>Nama Penitip</th>
                    <th>Nama Produk</th>
                    <th>Harga Produk</th>
                    <th>Total Produk Terbeli</th>
                    <th>Total</th>
                    <th>Komisi</th>
                    <th>Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="7">Loading...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="7">Error: {error.message}</td>
                    </tr>
                  )}

                  {data?.data?.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}

                  {data?.data?.map((penitip) => (
                    <React.Fragment key={penitip.Penitip_ID}>
                      {penitip.Produk.length === 0 ? (
                        <tr className="text-center">
                          <td>{penitip.Nama_Penitip}</td>
                          <td colSpan="6">Tidak ada produk yang dijual!</td>
                        </tr>
                      ) : (
                        penitip.Produk.map((produk, index) => (
                          <tr key={index} className="text-center">
                            {index === 0 && (
                              <td rowSpan={penitip.Produk.length}>
                                {penitip.Nama_Penitip}
                              </td>
                            )}
                            <td>{produk.Nama_Produk}</td>
                            <td>{produk.Harga_Produk}</td>
                            <td>{produk.Total_Produk_Terbeli}</td>
                            <td>{produk.Total}</td>
                            <td>{produk.Komisi}</td>
                            <td>{produk.Pendapatan}</td>
                          </tr>
                        ))
                    )}
                    </React.Fragment>
                  ))}
                  <tr className="text-center font-bold text-xl">
                    <td colSpan="6">Total</td>
                    <td>Rp {totalUang.toLocaleString("id-ID")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Penitip;