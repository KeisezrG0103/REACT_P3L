import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getPesananOnGoingByCustomer } from '../../../../api/detail_pesanan/detail_pesanan_query';
import { addBuktiBayar } from '../../../../api/pesanan/Pembayaran/pembayaran_query';
import ModalBukti from '../../../../components/Modal_Bukti';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../../slicer/slicer_bukti';
import { toast } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const OnGoing = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedNota, setSelectedNota] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const customer = JSON.parse(localStorage?.getItem("customer"));
  const Email = customer?.Email;
  const dispatch = useDispatch();

  const { data: pesananOnGoing, isLoading, refetch } = useQuery(
    ["pesananOnGoing", Email],
    () => getPesananOnGoingByCustomer(Email),
    {
      enabled: !!Email,
    }
  );

  const mutation = useMutation((data) => addBuktiBayar(data.noNota, data.file), {
    onSuccess: () => {
      toast.success("Bukti Pembayaran Berhasil Dikirim!");
      setIsSubmitting(false);
      refetch();
    },
    onError: (error) => {
      toast.error("Gagal Mengirim Bukti Pembayaran", error);
      setIsSubmitting(false);
    },
  });

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleFileChange = (e, noNota) => {
    setSelectedFile(e.target.files[0]);
    setSelectedNota(noNota);
  };

  const handleSubmit = () => {
    if (selectedFile && selectedNota) {
      setIsSubmitting(true);
      mutation.mutate({ noNota: selectedNota, file: selectedFile });
    }
  };

  if (isLoading) {
    return (
      <div className="Card w-full border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm">
        <div className="card-title flex flex-col items-start">
          <div className="mx-2 skeleton h-4 w-28"></div>
          <div className="mx-2 skeleton h-4 w-36"></div>
        </div>
        <div className="flex flex-col items-start card-body space-y-4">
          <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm w-full">
            <div className="skeleton h-32 w-32"></div>
            <div className="flex flex-col items-start ml-4">
              <div className="m-2 skeleton h-4 w-28"></div>
              <div className="m-2 skeleton h-4 w-32"></div>
              <div className="m-2 skeleton h-4 w-36"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedPesanan = pesananOnGoing?.data.sort((a, b) => b.NoNota.localeCompare(a.NoNota));

  const filteredPesanan = sortedPesanan?.filter((item) =>
    filterStatus ? item.Status === filterStatus : true
  );

  const handleOpenModal = (noNota, bukti) => {
    dispatch(setModal({ isOpen: true, noNota, bukti }));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-start mt-4 mb-2">
        <p className="text-xl font-semibold mr-4 mt-2">Status</p>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
          <option value="Menunggu Konfirmasi Pembayaran">Menunggu Konfirmasi Pembayaran</option>
          <option value="Siap dideliver">Sedang Dikirim</option>
          <option value="Siap dipickup">Siap Di Pick-Up</option>
        </select>
      </div>
      {filteredPesanan?.length > 0 ? (
        filteredPesanan.map((item) => (
          <div
            key={item.NoNota}
            className="Card w-full border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm"
          >
            <div className="card-title flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-md font-normal text-black">
                  No Nota :<span className="font-bold"> {item.NoNota}</span>
                </h1>
                <h1 className="text-md font-normal text-black mt-2">
                  Tanggal Diambil :
                  <span className="font-bold"> {item.TanggalDiambil}</span>
                </h1>
              </div>
              <p className="font-bold mt-2" style={{ fontSize: 14 }}>
              <span className={`px-3 py-3 rounded-full text-white ${item.Status === "Menunggu Konfirmasi Pembayaran" || item.Status === "Menunggu Pembayaran" ? "bg-error" 
                      : item.Status === "Siap dipickup" || item.Status === "Siap dideliver" || item.Status === "Diterima" ? "bg-success" : "bg-primary"}`}>
                  {item.Status}
                </span>
              </p>
            </div>
            <h1 className="card-title text-md font-normal text-black mt-2">
              Total : <strong>Rp.</strong>
              <span className="font-bold"> {item.Total}</span>
            </h1>
            {item.Status === "Menunggu Pembayaran" && (
              <div className="mt-6">
                <div>
                  <h1 className="font-bold text-lg mb-4">Kirim Bukti Pembayaran</h1>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, item.NoNota)}
                  required
                  className="border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-primary text-white rounded-md ml-4"
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? <CircularProgress size={25} color="inherit" /> : "Submit"}
                </button>
              </div>
            )}
            {item.Status !== "Menunggu Pembayaran" && item.Bukti && (
              <div className="mt-6">
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md"
                  onClick={() => handleOpenModal(item.NoNota, item.Bukti)}
                >
                  Lihat Bukti Pembayaran
                </button>
              </div>
            )}
            {item.DetailPesanan.map((detailPesanan, index) => (
              <div key={index} className="flex flex-col items-start card-body">
                <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md rounded-sm w-full">
                  <img
                    src={
                      detailPesanan.Gambar_Produk || detailPesanan.Gambar_Hampers
                    }
                    alt="ongoing" className="w-32 h-32"
                  />
                  <div className="flex flex-col items-start ml-4">
                    <h1 className="text-2xl font-normal text-black ml-4">
                      {detailPesanan.Nama_Produk || detailPesanan.Nama_Hampers}
                    </h1>
                    <h2 className="text-lg font-normal text-black ml-4">
                      Rp. {detailPesanan.SubTotal}
                    </h2>
                    <h2 className="text-lg font-normal text-black ml-4">
                      Jumlah : {detailPesanan.Total_Produk}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center text-xl font-semibold mt-10">
          Tidak Ada Pesanan On Going!
        </div>
      )}
      <ModalBukti />
    </div>
  );
};

export default OnGoing;