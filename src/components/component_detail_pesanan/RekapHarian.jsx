import React from "react";

const RekapHarian = ({ rekapHarian }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Rekap</h3>
      {rekapHarian?.map((item, index) => (
        <div key={index} className="">
          <p>
            {item.Jumlah} {item.Produk}
          </p>
        </div>
      ))}

      <div className="border-t-2 border-b-2 border-gray-300 mt-2 mb-4"></div>
    </div>
  );
};

export default RekapHarian;
