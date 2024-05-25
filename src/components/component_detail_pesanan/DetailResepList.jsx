// src/components/DetailResepList.js
import React from "react";

const DetailResepList = ({ detailResep }) => {
  return (
    <div>
      {detailResep?.data?.map((item, index) => (
        <div key={index} className="mb-4">
          {item.Detail_Resep.map((detail, detailIndex) => (
            <div key={detailIndex}>
              <h4 className="font-semibold">{detail.Nama_Resep}</h4>
              {detail.Detail_Resep.length > 0 ? (
                <ul className="my-2">
                  {detail.Detail_Resep.map((subDetail, subDetailIndex) => (
                    <li key={subDetailIndex} className="pl-4">
                      {subDetail.Nama}: {subDetail.Jumlah} {subDetail.satuan}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pl-4">No details available</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailResepList;
