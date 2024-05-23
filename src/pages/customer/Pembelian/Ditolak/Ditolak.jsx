import { getPesananDitolakByCustomer } from "../../../../api/detail_pesanan/detail_pesanan_query";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Ditolak = () => {
  const customer = JSON.parse(localStorage?.getItem("customer"));
  const Email = customer?.Email;
  const dispatch = useDispatch();

  const { data: pesananDitolak, isLoading } = useQuery(
    ["pesananDitolak", Email],
    () => getPesananDitolakByCustomer(Email),
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
    <div className="flex flex-col items-center justify-center gap-4">
      {pesananDitolak?.data.length > 0 ? (
        pesananDitolak.data.map((item) => (
          <div
            key={item.NoNota}
            className="Card w-full border-gray-50-2 border-gray-600 shadow-md p-4 rounded-sm"
          >
            <div className="card-title flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-md font-normal text-black">
                  No Nota :<span className="font-bold"> {item.NoNota}</span>
                </h1>
                <h1 className="text-md font-normal text-black mt-2">
                  Tanggal Pemesanan :
                  <span className="font-bold"> {item.TanggalDiambil}</span>
                </h1>
              </div>
              <p className="font-bold mt-2" style={{ fontSize: 14 }}>
                <span className={`px-3 py-3 rounded-full text-white bg-error`}>
                  {item.Status}
                </span>
              </p>
            </div>
            <h1 className="card-title text-md font-normal text-black mt-2">
              Total : <strong>Rp.</strong>
              <span className="font-bold"> {item.Total}</span>
            </h1>

            {item.Detail_Pesanan.map((detailPesanan, index) => (
              <div key={index} className="flex flex-col items-start card-body">
                <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md rounded-sm w-full">
                  <img
                    src={
                      detailPesanan.Gambar_Produk || detailPesanan.Gambar_Hampers
                    }
                    alt="ditolak"
                    className="w-32 h-32"
                  />
                  <div className="flex flex-col items-start ml-4">
                    <h1 className="text-2xl font-normal text-black ml-4">
                      {detailPesanan.Nama_Produk || detailPesanan.Nama_Hampers}
                    </h1>
                    <h2 className="text-lg font-normal text-black ml-4">
                      Rp. {detailPesanan.SubTotal}
                    </h2>
                    <h2 className="text-lg font-normal text-black ml-4">
                      Jumlah : {detailPesanan.Total_Produk}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center text-xl font-semibold mt-10">
          Tidak Ada Pesanan Ditolak!
        </div>
      )}
    </div>
  );
};

export default Ditolak;