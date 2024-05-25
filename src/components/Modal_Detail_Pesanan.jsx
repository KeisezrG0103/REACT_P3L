import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slicer/slicer_modal";
import { Custom_Date } from "../utils/Date";
import {
  getListPesananHarianDanYangDibeli,
  getDetailResepDanNamaResepUntukPesananBesok,
  getRekapPesananHarian,
} from "../api/pesanan/pesanan_query";
import { useQuery } from "react-query";
import ListYangDibeli from "./component_detail_pesanan/ListYangDIbeli";
import DetailResepList from "./component_detail_pesanan/DetailResepList";
import RekapHarian from "./component_detail_pesanan/RekapHarian"; // Import the new component

const Modal_Detail_Pesanan = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const Tanggal = new Custom_Date();
  const dispatch = useDispatch();
  const setOpen_Modal = (isOpen) => {
    dispatch(setModal(isOpen));
  };

  const { data: ListYangBeli, isLoading } = useQuery(
    ["getListPesananHarianDanYangDibeli", Tanggal.tommorowToString()],
    () => getListPesananHarianDanYangDibeli(Tanggal.tommorowToString()),
    {
      enabled: isOpen ? true : false,
    }
  );

  const { data: DetailResep } = useQuery(
    ["getDetailResepDanNamaResepUntukPesananBesok", Tanggal.tommorowToString()],
    () =>
      getDetailResepDanNamaResepUntukPesananBesok(Tanggal.tommorowToString()),
    {
      enabled: isOpen ? true : false,
    }
  );

  const { data: rekapHarian } = useQuery(
    ["getRekapPesananHarian", Tanggal.tommorowToString()],
    () => getRekapPesananHarian(Tanggal.tommorowToString()),
    {
      enabled: isOpen ? true : false,
    }
  );

  useEffect(() => {
    if (isOpen) {
      document.getElementById("modal_detail_pesanan").showModal();
    } else {
      document.getElementById("modal_detail_pesanan").close();
    }
  }, [isOpen]);

  return (
    <div>
      <dialog
        id="modal_detail_pesanan"
        className="modal"
        style={{ width: "80%", height: "80%" }}
      >
        <div className="modal-box" style={{ width: "100%", height: "100%" }}>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen_Modal(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">List Pesanan Harian</h3>
          <h3 className="font-normal text-md text-center">
            Tanggal {Tanggal.getTodayString()}
          </h3>
          <div className="border-t-2 border-b-2 border-gray-300 mt-2 mb-4"></div>

          <div className="grid grid-row-2 gap-4">
            <div className="grid grid-cols-2">
              <div>
                <h3 className="font-bold text-lg">List Pesanan</h3>
                <ListYangDibeli
                  ListYangBeli={ListYangBeli}
                  isLoading={isLoading}
                />
              </div>
              <div>
                <RekapHarian rekapHarian={rekapHarian} />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <h3 className="font-bold text-lg">Bahan</h3>
                <DetailResepList detailResep={DetailResep} />
              </div>
              <div>hello 3</div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal_Detail_Pesanan;
