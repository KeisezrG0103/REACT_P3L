import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { getDaftarPesananToConfirm, konfirmasiPesanan, tolakPesanan } from '../../../../api/pesanan/Konfirmasi/konfirmasi_query';
import { fetchBahanBakuKurang, showModal } from '../../../../slicer/slicer_bahan_baku_kurang';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Modal from '../../../../components/Modal_Bahan';

const Konfirmasi_Pembelian = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: pesanan, isLoading } = useQuery(
    ["getDaftarPesananToConfirm"],
    () => getDaftarPesananToConfirm()
  );

  const confirmMutation = useMutation(konfirmasiPesanan, {
    onSuccess: () => {
      toast.success("Berhasil Mengonfirmasi Pesanan");
      refetch();
    },
  });

  const rejectMutation = useMutation(tolakPesanan, {
    onSuccess: () => {
      toast.success("Berhasil Menolak Pesanan");
      refetch();
    },
  });

  const handleKonfirmasi = async (id) => {
    try {
      await confirmMutation.mutateAsync(id);
    } catch (error) {
      console.error('Gagal mengonfirmasi pesanan:', error);
    }
  };

  const handleTolak = async (id) => {
    try {
      await rejectMutation.mutateAsync(id);
    } catch (error) {
      console.error('Gagal menolak pesanan:', error);
    }
  };

  const handleCekBahanBaku = async (noNota) => {
    dispatch(showModal());
    dispatch(fetchBahanBakuKurang(noNota));
  };

  const filteredPesanan = pesanan?.filter((item) =>
    item.Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPesanan?.length / itemsPerPage);
  const paginatedPesanan = filteredPesanan?.slice(
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
          <h1 className="font-bold text-2xl">Konfirmasi Pembelian</h1>
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
          <div
            className="card-body relative"
            style={{ width: "100%", height: "70vh" }}
          >
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>No</th>
                    <th>No Nota</th>
                    <th>Tanggal Pesan</th>
                    <th>Tanggal Diambil</th>
                    <th>Status</th>
                    <th>Status Pembayaran</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPesanan?.map((item, index) => (
                    <tr key={item.Id} className="text-center">
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.Id}</td>
                      <td>{item.Tanggal_Pesan}</td>
                      <td>{item.Tanggal_Diambil}</td>
                      <td>{item.Status}</td>
                      <td>{item.Status_Pembayaran}</td>
                      <td>
                        <div className="flex flex-col md:flex-row justify-center items-center">
                          <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => handleKonfirmasi(item.Id)}
                            disabled={item.Status !== "Lunas"}
                          >
                            Konfirmasi
                          </button>
                          <button
                            className="ml-0 mt-2 md:mt-0 md:ml-2 btn btn-sm btn-error text-white"
                            onClick={() => handleTolak(item.Id)}
                            disabled={item.Status !== "Lunas"}
                          >
                            Tolak
                          </button>
                          <button
                            className="ml-0 mt-2 md:mt-0 md:ml-2 btn btn-sm btn-primary text-white"
                            onClick={() => handleCekBahanBaku(item.Id)} // Add this handler
                          >
                            Cek Bahan Baku
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      <Modal /> 
    </div>
  );
};

export default Konfirmasi_Pembelian;