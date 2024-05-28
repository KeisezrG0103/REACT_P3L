import React from "react";

const Laporan_Penjualan_Produk = () => {
  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Laporan Penjualan per Produk</h1>
          <div className="form-control"></div>
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
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="join flex justify-center mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Laporan_Penjualan_Produk;
