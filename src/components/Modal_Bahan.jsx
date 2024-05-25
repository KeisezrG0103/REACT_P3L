import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../slicer/slicer_bahan_baku_kurang';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, message, Kekurangan } = useSelector((state) => state.bahanBaku);

  if (!isOpen || !message) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded relative w-100">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black focus:outline-none"
          onClick={() => dispatch(hideModal())}
        >
          <IoIosCloseCircle size={25}  className='text-black'/>
        </button>
        <h2 className="text-2xl mt-6 font-bold">List Bahan Baku Yang Perlu Dibeli</h2>
        <div>
          <p className="mt-2">{message}</p>
          {Kekurangan && (
            <ul>
              {Kekurangan.map((item) => (
                <li key={item.Id} className="mt-2">
                  <strong>{item.Nama} : </strong> kekurangan <strong> {item.Kekurangan} {item.Satuan} </strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;