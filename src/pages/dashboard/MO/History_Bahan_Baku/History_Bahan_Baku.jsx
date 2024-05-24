import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getHistoryBahanBaku } from "../../../../api/history_bahan_baku/history_bahan_baku_query";

const History_Bahan_Baku = () => {
  const { data, isLoading } = useQuery(
    "getHistoryBahanBaku",
    getHistoryBahanBaku
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData =
    data?.data.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.Tanggal_Digunakan.toLowerCase().includes(searchLower) ||
        item.Nama_Bahan_Baku.toLowerCase().includes(searchLower) ||
        item.Jumlah_Penggunaan.toString().toLowerCase().includes(searchLower) ||
        item.Satuan.toLowerCase().includes(searchLower)
      );
    }) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">History Bahan Baku</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-60 md:w-auto"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div
            className="card-body relative"
            style={{ width: "100%", height: "70vh" }}
          >
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Tanggal Digunakan</th>
                      <th>Bahan Baku</th>
                      <th>Jumlah Penggunaan</th>
                      <th>Satuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{item.Tanggal_Digunakan}</td>
                        <td>{item.Nama_Bahan_Baku}</td>
                        <td>{item.Jumlah_Penggunaan}</td>
                        <td>{item.Satuan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="join flex justify-center mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`join-item btn btn-square ${
                  index + 1 === currentPage ? "btn-primary text-white" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History_Bahan_Baku;
