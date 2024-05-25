import React from "react";

const RekapBahanBaku = ({ rekapBahanBaku }) => {
  return (
    <div>
      {Object.values(rekapBahanBaku.rekap).map((item, index) => (
        <div key={index} className="">
          <p>
            {item.Kekurangan > 0 ? (
              <p>
                {item.Nama} {item.Kebutuhan} {item.Satuan}{" "}
                <span className="text-red-500" style={{ fontWeight: "bold" }}>
                  {"("} Kurang: {item.Kekurangan} {item.Satuan}
                  {")"}
                </span>
              </p>
            ) : (
              <p>
                {item.Nama} {item.Kebutuhan} {item.Satuan}
              </p>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RekapBahanBaku;
