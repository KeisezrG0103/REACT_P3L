import React from "react";

const RekapHarian = ({ rekapHarian, YangPerluDibuat }) => {
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
      <h3 className="text-lg font-semibold">Yang Perlu Dibuat</h3>

      {YangPerluDibuat?.resep.map((item, index) =>
        item.map((item, index) => (
          <div key={index} className="">
            <p>
              {item.cleanedName} {item.Jumlah_Proses} {item.satuan}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RekapHarian;
