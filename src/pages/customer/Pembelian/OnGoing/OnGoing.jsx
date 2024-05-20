import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getPesananOnGoingByCustomer } from "../../../../api/detail_pesanan/detail_pesanan_query";


const OnGoing = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const customer = JSON.parse(localStorage?.getItem("customer"));
  const Email = customer?.Email;
  const dispatch = useDispatch();

  const { data: pesananOnGoing, isLoading } = useQuery(
    ["pesananOnGoing", Email],
    () => getPesananOnGoingByCustomer(Email),
    {
      enabled: !!Email,
    }
  );

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

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

  const filteredPesanan = pesananOnGoing?.data.filter((item) =>
    filterStatus ? item.Status === filterStatus : true
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-start mt-4 mb-2">
        <p className="text-xl font-semibold mr-4 mt-2">Status</p>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
          <option value="Dikirim">Sedang Dikirim</option>
          <option value="Siap Dipickup">Siap Di Pick-Up</option>
        </select>
      </div>
      {filteredPesanan?.map((item) => (
        <div
          key={item.No_Nota}
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
              <span className={`px-3 py-3 rounded-full text-white ${item.Status === "Menunggu Pembayaran" ? "bg-error" : "bg-primary"}`}>
                {item.Status}
              </span>
            </p>
          </div>
          {item.DetailPesanan.map((detailPesanan, index) => (
            <div key={index} className="flex flex-col items-start card-body">
              <div className="flex flex-row items-start card border-gray-50-2 border-gray-600 shadow-md rounded-sm w-full">
                <img
                  src={
                    detailPesanan.Gambar_Produk || detailPesanan.Gambar_Hampers
                  }
                  alt="ongoing"
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
      ))}
    </div>
  );
};

export default OnGoing;