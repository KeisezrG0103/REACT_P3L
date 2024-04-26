import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStateView } from "../../../slicer/slicer_customer_view_produk";
import ReactDatePicker from "react-datepicker";
import { useQuery } from "react-query";
import { getKuotaProdukByIdAndDate } from "../../../api/produk/produk_query";

const ViewProduk = () => {
  // Initial date is set to two days from now
  const [startDate, setStartDate] = React.useState(() => {
    const today = new Date();
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    return twoDaysAfterToday;
  });

  const [kuotaProduk_, setKuotaProduk] = React.useState(null);

  const dispatch = useDispatch();
  const Produk = useSelector((state) => state.customer_view_produk.produk);


  const toStringDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const { data: kuotaProduk } = useQuery(
    ["kuota", Produk.Id, toStringDate(startDate)],
    () => getKuotaProdukByIdAndDate(Produk.Id, toStringDate(startDate))
  );

  console.log(kuotaProduk);

  useEffect(() => {
    if (kuotaProduk) {
      setKuotaProduk(kuotaProduk?.Kuota);

      // Show an alert if the kuota is zero
      if (kuotaProduk.Kuota === 0) {
        alert("Produk sudah habis");
      }
    }
  }, [kuotaProduk]);

  // Handle the pre-order button click
  const handlePreOrder = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    if (startDate < twoDaysAfterToday) {
      alert("Tanggal pengiriman harus lebih dari 2 hari dari hari ini");
      return;
    }
  };

  return (
    <div>
      <div className="container mx-auto px-6">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a>Produk</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-row-2 gap-6 sm:grid-rows-2 lg:grid-cols-2">
          <div className="grid grid-span-1">
            <img
              src={Produk.Gambar}
              alt="gambar produk"
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="grid grid-span-1">
            <div className="flex flex-col justify-between">
              <div>
                <div className="badge badge-success text-white p-4">
                  Kuota {kuotaProduk_} Produk
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {Produk.Nama}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800 my-4">
                  Rp. {Produk.Harga}
                </h2>
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700">Jumlah</label>
                  <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    defaultValue={0}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700">Tanggal Pengiriman</label>
                  <ReactDatePicker
                    // date + 2 days from now
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end items-end">
                  <button
                    className="block text-center w-full p-3 mt-4 bg-primary text-white uppercase font-semibold rounded"
                    onClick={handlePreOrder}
                  >
                    Pre Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduk;
