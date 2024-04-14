import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../slicer/slicer_modal";
import { useMutation } from "react-query";
import { deleteProduk } from "../api/produk/produk_query";
import { toast } from "react-hot-toast";
import { deleteHampers } from "../api/hampers/hampers_query";
function Modal_Delete() {
  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.modal);
  const key = useSelector((state) => state.modal.Key);
  const setOpen = (isOpen) => dispatch(setModal(isOpen));
  const Item = useSelector((state) => state.modal.item);
  const mutation = useMutation(deleteProduk);
  const mutateHampers = useMutation(deleteHampers);

  const NameofProduk = (key) => {
    if (key == "produk") {
      return Item.Nama_Produk;
    }
    if (key == "hampers") {
      return Item.Nama_Hampers;
    }
  };

  const deleteProdukFunc = (id) => {
    if (key == "produk") {
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
    }

    if (key == "hampers") {
      mutateHampers.mutate(id, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Hampers berhasil dihapus");
          window.location.reload(true);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
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
          Apakah Anda yakin akan menghapus <b>{NameofProduk(key)}</b> ?
        </p>

        <div className="flex justify-end">
          <button
            className="btn btn-primary text-base-100"
            style={{ width: "5rem" }}
            onClick={() => deleteProdukFunc(Item.Id)}
          >
            {/* modified this please */}
            {mutation.isLoading || mutateHampers.isLoading  ? (
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
