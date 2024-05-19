import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setModal, setModalKey } from "../slicer/slicer_modal";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addAlamat } from "../api/alamat/alamat_query";
import toast from "react-hot-toast";

const Modal_Alamat = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const isOpen = modal.isOpen;
  const customer = JSON.parse(localStorage.getItem("customer"));

  const addAlamatMutation = useMutation(addAlamat);

  const { register, handleSubmit } = useForm();

  if (isOpen) {
    document.getElementById("my_modal_3").showModal();
  }

  const setOpen = (value) => {
    dispatch(setModal(value));
    dispatch(setModalKey(""));
    dispatch(setItems({}));
  };

  const onSubmit = (data) => {
    const dataToSend = {
      ...data,
      Customer_Email: customer.Email,
    };
    try {
      addAlamatMutation.mutate(
        { data: dataToSend, Email: customer.Email },
        {
          onSuccess: () => {
            window.location.reload(true);
            toast.success("Alamat berhasil ditambahkan");
          },
          onError: () => {
            toast.error("Gagal menambahkan alamat");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Tambah Alamat</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Alamat</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("Alamat", { required: true })}
                required
              />
            </label>
            <div className="flex justify-end mt-4">
              <button className="btn btn-primary mt-4 text-white">
                Tambah Alamat
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Modal_Alamat;
