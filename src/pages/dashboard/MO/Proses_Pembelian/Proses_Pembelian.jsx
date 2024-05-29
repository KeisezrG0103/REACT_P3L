import { Link } from "react-router-dom";
import {
  getDaftarPesananYangDiprosesHariIni,
  GetKekuranganBahanBaku,
  changeStatusToProses,
} from "../../../../api/pesanan/pesanan_query";
import { useQuery } from "react-query";
import { Custom_Date } from "../../../../utils/Date";
import { useEffect, useState } from "react";
import { Toast } from "flowbite-react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../slicer/slicer_modal";
import Modal_Detail_Pesanan from "../../../../components/Modal_Detail_Pesanan";

const Proses_Pembelian = () => {
  const tanggal = new Custom_Date();

  const [No_Nota, setNo_Nota] = useState("");

  const dispatch = useDispatch();

  const {
    data: pesanan,
    isLoading,
    refetch,
  } = useQuery(
    ["getDaftarPesananYangDiprosesHariIni", tanggal.tommorowToString()],
    () => getDaftarPesananYangDiprosesHariIni(tanggal.tommorowToString())
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { data: kekurangan } = useQuery(
    ["GetKekuranganBahanBaku", No_Nota],
    () => GetKekuranganBahanBaku(No_Nota),
    {
      enabled: No_Nota != "",
    }
  );

  useEffect(() => {
    dispatch(setModal(false));
  }, [dispatch]);

  const { mutate } = useMutation(changeStatusToProses);

  const selectNoNota = (Nota) => {
    setNo_Nota(Nota);

    mutate(Nota, {
      onSuccess: (data) => {
        console.log(data);
        if (data.message == "Ada bahan baku yang kurang") {
          toast.error("Ada bahan baku yang kurang");
        } else {
          toast.success("Berhasil Memproses Pesanan");
        }
      },
      onError: () => {
        toast.error("Gagal Memproses Pesanan");
      },
    });
  };

  const open_detail_pesanan = () => {
    dispatch(setModal(true));
  };

  return (
    <div>
      <div className="flex justify-between align-baseline lg:place-items-center lg:items-end">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Proses Pembelian</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-60 md:w-auto"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary w-28 text-white"
            onClick={open_detail_pesanan}
          >
            Detail
          </button>
          <Modal_Detail_Pesanan />
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
                      <th>No Nota</th>
                      <th>Tanggal Pesan</th>
                      <th>Status</th>
                      <th>Tanggal Diambil</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pesanan?.data.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.Id}</td>
                        <td>{item.Tanggal_Pesan}</td>
                        <td>{item.Status}</td>
                        <td>{item.Tanggal_Diambil}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => selectNoNota(item.Id)}
                          >
                            Proses
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proses_Pembelian;
