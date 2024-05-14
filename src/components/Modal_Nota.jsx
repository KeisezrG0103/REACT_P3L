import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setNoNota } from "../slicer/slicer_Nota";
const Modal_Nota = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Nota.isOpen);
  const No_Nota = useSelector((state) => state.Nota.No_Nota);

  if (isOpen) {
    document.getElementById("my_modal_3").showModal();
  }

  const setOpen = (value) => {
    dispatch(setModal(value));
    dispatch(setNoNota(""));
  };

  return (
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
        <h3 className="font-bold text-lg">Atma Kitchen</h3>
        <p>Jl. Centralpark No. 10 Yogyakarta</p>
        <div className="flex flex-col mt-4">
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">No Nota</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">{No_Nota}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Tanggal Pesan</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Lunas Pada</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Tanggal Ambil</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="font-bold text-lg">Customer</h3>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Nama</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Alamat</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Delivery</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">1234567890</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="font-bold text-lg">Detail Pesanan</h3>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Nama Menu</p>
            <p className="font-normal">Qty</p>
            <p className="font-normal text-end">Harga</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Nasi Goreng</p>
            <p className="font-normal">1</p>
            <p className="font-normal text-end">Rp. 12.000</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Ayam Goreng</p>
            <p className="font-normal">1</p>
            <p className="font-normal text-end">Rp. 15.000</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Es Teh</p>
            <p className="font-normal">1</p>
            <p className="font-normal text-end">Rp. 5.000</p>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-4"></div>

        <div className="flex flex-col mt-4">
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Subtotal</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 32.000</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Ongkir</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 3.200</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Total</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 35.200</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Potongan Poin</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 35.200</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Total</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 35.200</p>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1">
            <p className="font-normal">Poin Yang didapat</p>
            <p className="font-normal">:</p>
            <p className="font-normal text-end">Rp. 35.200</p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal_Nota;
