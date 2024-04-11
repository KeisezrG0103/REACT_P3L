import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setModal } from "../slicer/slicer_modal";
import { useMutation } from "react-query";
import { deleteProduk } from "../api/produk/produk_query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Modal_Delete() {
  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.modal);
  const setOpen = (isOpen) => dispatch(setModal(isOpen));
  const Item = useSelector((state) => state.modal.item);
  const Navigate = useNavigate();
  const mutation = useMutation(deleteProduk);

  const deleteProdukFunc = (id) => {
    mutation.mutate(id, {
      onSuccess: (res) => {
        console.log(res);
        toast.success("Produk berhasil dihapus");
        window.location.reload(true);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  if (stateModal.isOpen) {
    document.getElementById("my_modal_3").showModal();
  }

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Konfirmasi</h3>
        <p className="py-4">
          Apakah Anda yakin akan menghapus {Item.Nama_Produk}
        </p>

        <div className="flex justify-end">
          <button
            className="btn btn-primary text-base-100"
            style={{ width: "5rem" }}
            onClick={() => deleteProdukFunc(Item.Id)}
          >
            {mutation.status === "loading" ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Ya"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal_Delete;
