import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeProduk, sortProduk } from "../../../slicer/slicer_checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state?.checkout.Produk);

  useEffect(() => {
    dispatch(sortProduk());
  }, [dispatch]);

  const handleRemoveProduk = (id) => {
    dispatch(removeProduk(id));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4">
      <div className="p-2 lg:p-0 flex flex-col gap-4 w-full lg:w-1/3">
        {checkout.map((item, index) => {
          return (
            <div
              key={index}
              className="card p-4 bg-gray-100 md:col-span-3 w-full"
            >
              <div className="relative flex flex-row items-center w-full">
                <img src={item.Gambar} alt="gambar produk" className="w-40" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-semibold">{item.Nama}</h3>
                  <h3 className="text-md font-normal">Rp. {item.Harga}</h3>
                  <h3 className="text-md font-normal">
                    Jumlah: {item.Jumlah} produk
                  </h3>
                  {/* date picker */}
                  <div className="flex flex-row gap-2">
                    <label className="text-gray-700">
                      Tanggal Pengiriman :{" "}
                    </label>
                    <label className="text-gray-700 font-bold">
                      {item.Tanggal_Pengiriman}
                    </label>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0">
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoveProduk(item.Id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card p-4 bg-gray-100 h-20 lg:h-80">
        <div className="flex flex-col items-end justify-between">
          <h3 className="text-md font-semibold">Total Pembayaran</h3>
          <h3 className="text-md font-normal">
            Rp.{" "}
            {checkout.reduce((acc, curr) => {
              return acc + curr.Harga * curr.Jumlah;
            }, 0)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
