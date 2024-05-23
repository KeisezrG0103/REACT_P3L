import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../slicer/slicer_bukti";
import { IoIosCloseCircle } from "react-icons/io";

const ModalBukti = () => {
  const dispatch = useDispatch();
  const { isOpen, bukti } = useSelector((state) => state.bukti);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bukti) {
      const img = new Image();
      img.src = bukti;
      img.onload = () => setIsLoading(false);
    }
  }, [bukti]);

  const handleClose = () => {
    dispatch(closeModal());
    setIsLoading(true);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal-open" : ""}`}
      onClick={handleClose}
    >
      <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-3xl text-black"
          onClick={handleClose}
        >
          <IoIosCloseCircle />
        </button>
        <h2 className="text-lg font-bold mb-4">Bukti Pembayaran</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          bukti && (
            <img
              src={bukti}
              alt="Bukti Pembayaran"
              className="w-full h-auto mt-4"
            />
          )
        )}
      </div>
    </div>
  );
};

export default ModalBukti;
