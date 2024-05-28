import React from "react";
import { useQuery } from "react-query";
import { getLaporanBahanBaku } from "../../api/laporan/laporan_query";
import PDF_Laporan_penjualan_produk from "../../components/PDF_Laporan_penjualan_produk";
import PDF_Laporan_stok_bahan_baku from "../../components/PDF_Laporan_Stok_Bahan_Baku";
import { PDFDownloadLink } from "@react-pdf/renderer";
const Laporan_Stok_Bahan_Baku = () => {
  const { data, isLoading, error } = useQuery("laporanBahanBaku", () =>
    getLaporanBahanBaku()
  );

  return (
    <div>
      <div>
        <div className="flex justify-between place-items-end lg:place-items-center">
          <div className="flex flex-col md:flex-row md:justify-between md:w-full space-y-4 md:space-y-0">
            <div className="flex items-start space-y-4 flex-col">
              <h1 className="font-bold text-2xl">Laporan Stok Bahan Baku</h1>
              <div className="form-control">
                {/* <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="input"
                /> */}
              </div>
            </div>
            <div className="flex items-end">
              <PDFDownloadLink
                document={<PDF_Laporan_stok_bahan_baku data={data} />}
                fileName="Laporan_Stok_Bahan_Baku.pdf"
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
                      <th>Satuan</th>
                      <th>Qty</th>
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
                        <td colSpan="4">Error fetching data</td>
                      </tr>
                    )}

                    {data?.data.length === 0 && (
                      <tr>
                        <td colSpan="4">No data available</td>
                      </tr>
                    )}

                    {data?.data.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{item.Nama}</td>
                        <td>{item.Satuan}</td>
                        <td>{item.Qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="join flex justify-center mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Stok_Bahan_Baku;
