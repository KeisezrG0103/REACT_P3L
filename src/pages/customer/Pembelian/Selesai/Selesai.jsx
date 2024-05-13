import React from "react";
import { getPesananSelesaiByCustomer } from "../../../../api/detail_pesanan/detail_pesanan_query";
import { useQuery } from "react-query";

const Selesai = () => {
  const customer = JSON.parse(localStorage?.getItem("customer"));
  const Email = customer?.Email;

  const { data: pesananSelesai, isLoading } = useQuery(
    ["pesananSelesai", Email],
    () => getPesananSelesaiByCustomer(Email),
    {
      enabled: Email ? true : false,
    }
  );

  if (isLoading) {
    return (
      <div className="Card w-full border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm">
      <div className="card-title flex flex-col items-start">
        <div className="mx-2 skeleton h-4 w-28"></div>
        <div className="mx-2 skeleton h-4 w-36"></div>
      </div>
      <div className="flex flex-col items-start card-body space-y-4">
        <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm w-full">
          <div className="skeleton h-32 w-32"></div>
          <div className="flex flex-col items-start ml-4">
            <div className="m-2 skeleton h-4 w-28"></div>
            <div className="m-2 skeleton h-4 w-32"></div>
            <div className="m-2 skeleton h-4 w-36"></div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
   
    <div className="flex flex-col items-center justify-center space-y-4">
      {pesananSelesai?.data.map((item) => (
        <div
          key={item.No_Nota}
          className="Card w-full border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm"
        >
          <div className="card-title flex flex-col items-start">
            <h1 className="text-md font-normal text-black">
              No Nota :<span className="font-bold"> {item.No_Nota}</span>
            </h1>
            <h1 className="text-md font-normal text-black">
              Tanggal Pemesanan :
              <span className="font-bold"> {item.Tanggal_Diambil}</span>
            </h1>
          </div>

          {item.Detail_Pesanan.map((detailPesanan) => (
            <div
              key={detailPesanan.id}
              className="flex flex-col items-start card-body space-y-4"
            >
              <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm w-full">
                <img
                  src={
                    detailPesanan.Gambar_Produk || detailPesanan.Gambar_Hampers
                  }
                  alt="selesai"
                  className="w-32 h-32"
                />
                <div className="flex flex-col items-start ml-4">
                  <h1 className="text-2xl font-semibold text-black ml-4">
                    {detailPesanan.Nama_Produk || detailPesanan.Nama_Hampers}
                  </h1>
                  <h2 className="text-lg font-semibold text-black ml-4">
                    Rp. {detailPesanan.SubTotal}
                  </h2>
                  <h2 className="text-lg font-semibold text-black ml-4">
                    Jumlah : {detailPesanan.Total_Produk}
                  </h2>
                </div>
              </div>
            </div>
          ))}
          <div className="card-footer flex justify-end w-full">
            <button className="bg-primary text-white font-semibold p-2 rounded-md hover:bg-accent">
              Cetak Nota
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selesai;
