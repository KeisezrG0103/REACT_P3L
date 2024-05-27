import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { getDaftarSaldoToConfirm, konfirmasiSaldo } from '../../../../api/saldo/saldo_query';
import toast from 'react-hot-toast';

const Konfirmasi_Saldo = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: pesanan, isLoading, refetch } = useQuery(
    ["getDaftarSaldoToConfirm"],
    getDaftarSaldoToConfirm
  );

  const confirmMutation = useMutation(konfirmasiSaldo, {
    onSuccess: () => {
      toast.success("Berhasil Mengonfirmasi Penarikan Saldo");
      refetch();
    },
  });

  const handleKonfirmasi = async (id) => {
    try {
      await confirmMutation.mutateAsync(id);
      await refetch();
    } catch (error) {
      console.error('Gagal mengonfirmasi saldo:', error);
    }
  };

  const filteredPesanan = pesanan?.filter((item) =>
    item.Customer_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Tanggal_Penarikan.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredPesanan.length / itemsPerPage);
  const paginatedPesanan = filteredPesanan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Konfirmasi Penarikan Saldo</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-60 md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <th>Id</th>
                    <th>Jumlah Penarikan</th>
                    <th>Email</th>
                    <th>Tanggal Penarikan</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPesanan.length > 0 ? (
                    paginatedPesanan.map((item) => (
                      <tr key={item.Id} className="text-center">
                        <td>{item.Id}</td>
                        <td>{item.Jumlah_Penarikan}</td>
                        <td>{item.Customer_Email}</td>
                        <td>{item.Tanggal_Penarikan}</td>
                        <td>{item.Status}</td>
                        <td>
                          <div className="flex flex-col md:flex-row justify-center items-center">
                            <button
                              className="btn btn-sm btn-success text-white"
                              onClick={() => handleKonfirmasi(item.Id)}
                              disabled={item.Status === "Berhasil"}
                            >
                              Konfirmasi
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-xl mt-2">
                        <strong>Tidak ada penarikan saldo yang perlu dikonfirmasi</strong>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="join flex justify-center mb-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`join-item btn btn-square ${index + 1 === currentPage ? "btn-primary text-white" : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi_Saldo;