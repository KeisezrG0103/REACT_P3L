import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setNoNota } from "../slicer/slicer_Nota";
import { getNotaByNoNota } from "../api/pesanan/pesanan_query";
import { useQuery } from "react-query";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import NotaDocument from "./NotaDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Modal_Nota = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Nota.isOpen);
  const No_Nota = useSelector((state) => state.Nota.No_Nota);

  const { data, isLoading, isError } = useQuery(
    ["getNotaByNoNota", No_Nota],
    () => getNotaByNoNota(No_Nota),
    {
      enabled: isOpen && No_Nota !== "",
    }
  );

  console.log(data?.Nota);

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
        <div className="flex flex-row mt-4 justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Atma Kitchen</h3>
            <p>Jl. Centralpark No. 10 Yogyakarta</p>
          </div>
          <div>
            <PDFDownloadLink
              document={<NotaDocument data={data} />}
              fileName="nota.pdf"
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a5568",
                backgroundColor: "#edf2f7",
                border: "1px solid #edf2f7",
                borderRadius: "5px",
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>

        {data?.Nota.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col mt-4">
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">No Nota</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">{item.NoNota}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Tanggal Pesan</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">{item.TanggalPesan}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Lunas Pada</p>
                <p className="font-normal">:</p>
                {item.TanggalPelunasan === null ? (
                  <p className="font-normal text-end">-</p>
                ) : (
                  <p className="font-normal text-end">
                    {item.TanggalPelunasan}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Tanggal Ambil</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">{item.TanggalDiambil}</p>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <h3 className="font-bold text-lg">Customer</h3>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Email</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">{item.Email}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Alamat</p>
                <p className="font-normal">:</p>
                {item.Alamat === null ? (
                  <p className="font-normal text-end">-</p>
                ) : (
                  <p className="font-normal text-end">{item.Alamat}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Delivery</p>
                <p className="font-normal">:</p>
                {item.JasaPengiriman === null ? (
                  <p className="font-normal text-end">-</p>
                ) : (
                  <p className="font-normal text-end">{item.JasaPengiriman}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <h3 className="font-bold text-lg">Detail Pesanan</h3>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Nama Produk</p>
                <p className="font-normal">Qty</p>
                <p className="font-normal text-end">Harga</p>
              </div>
              {data?.DetailPesanan.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 py-1">
                  <p className="font-normal">
                    {item.Nama_Produk || item.Nama_Hampers}
                  </p>
                  <p className="font-normal">{item.Total_Produk}</p>
                  <p className="font-normal text-end">
                    {item.Harga_Produk || item.Harga_Hampers}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 mt-4"></div>
            <div className="flex flex-col mt-4">
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Total</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">Rp. {item.Total_Raw}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Ongkir</p>
                <p className="font-normal">:</p>
                {item.OngkosKirim === null ? (
                  <p className="font-normal text-end">-</p>
                ) : (
                  <p className="font-normal text-end">Rp. {item.OngkosKirim}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Total</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">
                  Rp. {item.Total_Raw + item.OngkosKirim}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Potongan Poin</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">
                  Rp. {item.PenggunaanPoin}
                </p>
              </div>
              <div className="border-t border-gray-300 mt-4"></div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Total</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">Rp. {item.Total}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <p className="font-normal">Poin Yang didapat</p>
                <p className="font-normal">:</p>
                <p className="font-normal text-end">{item.PoinDidapat} Poin</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </dialog>
  );
};

export default Modal_Nota;
