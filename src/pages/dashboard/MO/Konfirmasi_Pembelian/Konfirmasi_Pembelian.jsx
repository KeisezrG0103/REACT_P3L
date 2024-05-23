import { Link } from "react-router-dom";
import { getDaftarPesananToConfirm } from "../../../../api/pesanan/Konfirmasi/konfirmasi_query";
import { useQuery, useMutation } from "react-query";
import { konfirmasiPesanan, tolakPesanan } from '../../../../api/pesanan/Konfirmasi/konfirmasi_query';
import toast from "react-hot-toast";
import { useState } from "react";

const Konfirmasi_Pembelian = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: pesanan, isLoading, isError, refetch } = useQuery(
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

  const filteredPesanan = pesanan?.filter((item) =>
    item.Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Status_Pembayaran.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {filteredPesanan.map((item, index) => (
                    <tr key={item.Id} className="text-center"> 
                      <td>{index + 1}</td>
                      <td>{item.Id}</td>
                      <td>{item.Tanggal_Pesan}</td>
                      <td>{item.Tanggal_Diambil}</td>
                      <td>{item.Status}</td>
                      <td>{item.Status_Pembayaran}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary text-white" 
                          onClick={() => handleKonfirmasi(item.Id)}
                          disabled={item.Status === "Diterima" || item.Status === "Ditolak"}
                        >
                          Konfirmasi
                        </button>
                        <button 
                          className="ml-4 btn btn-sm btn-error text-white" 
                          onClick={() => handleTolak(item.Id)}
                          disabled={item.Status === "Diterima" || item.Status === "Ditolak"}
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi_Pembelian;