import React from "react";

const ListYangDibeli = ({ ListYangBeli, isLoading }) => {
  const formatTime = (datetime) => {
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        ListYangBeli?.data.map((pesananItem, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">
              Pesanan ID: {pesananItem.Pesanan.Id}
            </h4>
            <p>Nama: {pesananItem.Pesanan.Nama}</p>
            <p>
              Jam Pengambilan: {formatTime(pesananItem.Pesanan.Tanggal_Diambil)}
            </p>

            {pesananItem.Detail_Pesanan.map((detail, idx) => (
              <div key={idx} className="pl-4 mt-3">
                <p>
                  {detail.Total_Produk}{" "}
                  {detail.Nama_Produk || detail.Nama_Hampers}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ListYangDibeli;
