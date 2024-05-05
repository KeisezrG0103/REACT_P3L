import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../slicer/slicer_DetailResep";
import { getDetail } from "../api/resep/resep_query";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";

import { CiSquarePlus } from "react-icons/ci";
import { set, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { setEdit } from "../slicer/slicer_tambahEditDetailHampers";

const Modal_DetailResep = () => {
  const stateResep = useSelector((state) => state.detailResep.item);
  const stateIsOpen = useSelector((state) => state.detailResep.isOpen);
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState(false);
  const [stateEdit, setStateEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});

  const doEdit = (item) => {
    setItemEdit(item);
    setStateEdit(true);
    console.log(itemEdit);
  };
  // console.log(stateEdit);

  const dispatch = useDispatch();
  const setOpen_Modal = (isOpen) => {
    dispatch(setOpen(isOpen));
    setState(isOpen);
    reset();
  };

  const resep = stateResep;

  const {
    data: detailResep,
    refetch,
    isLoading,
  } = useQuery(["detailResep", resep.Resep_Id], () =>
    getDetail(resep.Resep_Id)
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  // console.log(produkNonPenitip);
  console.log(detailResep);

  if (stateIsOpen) {
    document.getElementById("modal_Detail_Resep").showModal();
  }
  return (
    <dialog id="modal_Detail_Resep" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen_Modal(false)}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Detail Resep</h3>
        <div className="overflow-y-auto h-80">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nama Bahan</th>
                <th>qty</th>
                <th className="text-center">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="2">
                    <div className="h-full w-full flex justify-center items-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : detailResep && detailResep.length > 0 ? (
                detailResep.map((item) => (
                  <tr key={item.Id} className="hover">
                    <td>{item.Nama}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-center">{item.satuan}</td>
                    <td className="text-center">
                      <div className="flex flex-row justify-center items-center"></div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          {state || stateEdit ? (
            <form onSubmit={handleSubmit(stateEdit ? updateDetail : onSubmit)}>
              <div className="flex flex-row justify-end">
                <select
                  className="input input-ghost w-full"
                  required
                  {...register("Produk_Id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  defaultValue={stateEdit ? itemEdit.Id : ""}
                >
                  <option value={stateEdit ? itemEdit.Id : ""}>
                    {" "}
                    {stateEdit ? itemEdit.Nama : "Pilih Produk"}
                  </option>
                  {produkNonPenitip?.map((item) => {
                    const existingDetail = detailHampers?.find(
                      (detail) => detail.Produk_Id === item.Id
                    );

                    if (!existingDetail) {
                      return (
                        <option key={item.Id} value={item.Id}>
                          {item.Nama_Produk}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
                <input
                  type="number"
                  placeholder="Jumlah"
                  className="input input-bordered w-1/2 ml-2"
                  required
                  {...register("Jumlah", { required: true })}
                  defaultValue={stateEdit ? itemEdit.Jumlah : 0}
                />
              </div>

              <div>
                <button className="btn btn-sm btn-success text-white">
                  {stateEdit ? "Edit" : "Simpan"}
                </button>

                <button
                  className="btn btn-sm btn-error text-white ml-2 mt-2"
                  onClick={() => setIsInput(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <button
              // className="btn btn-sm btn-neutral text-white"
              onClick={() => setIsInput(true)}
            >
              <CiSquarePlus className="text-5xl btn btn-square " />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal_DetailResep;
