import { Link } from "react-router-dom";
import {
  getPengadaanBahanBaku,
  deletePengadaanBahanBaku,
} from "../../../../api/pengadaan_bahan_baku/pengadaan_bahan_baku_query";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItem, setIsEdit, resetState } from "../../../../slicer/slicer_IsEdit";
import {setModal, setItems, setModalKey } from "../../../../slicer/slicer_modal";
import Modal_Delete from "../../../../components/Modal_Delete";
import { useNavigate } from "react-router-dom";
const PengadaanBahanBaku = () => {
  const { data, refetch, isLoading } = useQuery(
    "pengadaan_bahan_baku",
    getPengadaanBahanBaku
  );
  
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [resetState]);

  const OpenModal = (item) => {
    dispatch(setItems(item));
    dispatch(setModal(true));
    dispatch(setModalKey("pengadaan_bahan_baku"));
  };

  const dispatch = useDispatch();
  
  const handleEdit = (item) => {
    dispatch(setItem(item));
    dispatch(setIsEdit(true));
  };

  const pengadaanBahanBaku = data?.data;
  console.log(pengadaanBahanBaku);



  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const currentData = pengadaanBahanBaku?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pengadaanBahanBaku?.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Pengadaan Bahan Baku</h1>
        <Link to="/dashboard/MO/pengadaanBahanBaku/tambah">
          <button className="btn btn-primary text-white mt-5">
            Tambah Pengadaan Bahan Baku
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%", height:"70vh" }}>
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
                      <th>Bahan Baku</th>
                      <th>Harga</th>
                      <th>Jumlah</th>
                      <th>Satuan</th>
                      <th>Tanggal Pengadaan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((pengadaanBahanBaku, index) => (
                      <tr key={startIndex + index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>{pengadaanBahanBaku.BahanBaku_Nama}</td>
                        <td>{pengadaanBahanBaku.Harga}</td>
                        <td>{pengadaanBahanBaku.Qty}</td>
                        <td>{pengadaanBahanBaku.Satuan}</td>
                        <td>{pengadaanBahanBaku.Tanggal_Pengadaan}</td>
                        <td className="flex justify-center flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:text-center">
                          <Link
                            to={`/dashboard/MO/pengadaanBahanBaku/${pengadaanBahanBaku.Id}`}
                          >
                            <button className="btn btn-primary text-white w-20" onClick={() => handleEdit(pengadaanBahanBaku)}>
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-error text-white w-20"
                            onClick={() => OpenModal(pengadaanBahanBaku)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
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
                    index + 1 === page ? "btn-primary text-white" : ""
                  }`}
                  onClick={() => changePage(index + 1)}
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

export default PengadaanBahanBaku;
