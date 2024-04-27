import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { useQuery } from "react-query";
import { getKuotaProdukByIdAndDate } from "../../../api/produk/produk_query";
import { FaCartPlus } from "react-icons/fa";
import { setProduk } from "../../../slicer/slicer_cartProduk";

const ViewProduk = () => {
  const Produk = useSelector((state) => state.customer_view_produk.produk);
  const type = useSelector((state) => state.customer_view_produk.type);
  const [jumlah, setJumlah] = React.useState(0);
  const [startDate, setStartDate] = React.useState(() => {
    const today = new Date();
    if (type === "produkPenitip" || type === "Add to cart")
      return new Date(today);

    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    return twoDaysAfterToday;
  });

  const cart = useSelector((state) => state.cartProduk);

  console.log(cart.Produk);

  const [kuotaProduk_, setKuotaProduk] = React.useState(null);

  const dispatch = useDispatch();

  const toStringDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const { data: kuotaProduk } = useQuery(
    ["kuota", Produk.Id, toStringDate(startDate)],
    () => getKuotaProdukByIdAndDate(Produk.Id, toStringDate(startDate)),
    {
      enabled: !(type === "produkPenitip" || type === "Add to cart"),
    }
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

  const handlePreOrderorOrder = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAfterToday = new Date(today);
    twoDaysAfterToday.setDate(today.getDate() + 2);
    if (Produk.Stok === 0) {
      if (startDate < twoDaysAfterToday) {
        alert("Tanggal pengiriman harus lebih dari 2 hari dari hari ini");
        return;
      }
    } else {
      alert("Order Berhasil");
    }
  };

  const handleAddToCart = (Produk) => {
    const cartProduk = {
      Id: Produk.Id || Produk.Id_Produk,
      Nama: Produk.Nama || Produk.Nama_Produk,
      Harga: Produk.Harga || Produk.Harga_Produk,
      Gambar: Produk.Gambar || Produk.Gambar_Produk,
      Jumlah: jumlah,
      Tanggal_Pengiriman: toStringDate(startDate),
    };

    // Check if the product is already in the cart
    const isProdukInCart = cart.Produk.some(
      (item) => item.Id === cartProduk.Id
    );

    if (isProdukInCart) {
      alert("Produk sudah ada di keranjang");
      return;
    }

    dispatch(setProduk(cartProduk));
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
                {type === "produkPenitip" || type === "Add to cart" ? (
                  <div className="badge badge-success text-white p-4">
                    Stok {Produk.Stok_Produk || Produk.Stok} Produk
                  </div>
                ) : (
                  <div className="badge badge-success text-white p-4">
                    Kuota {kuotaProduk_} Produk
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-gray-800">
                  {Produk.Nama || Produk.Nama_Produk}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800 my-4">
                  Rp. {Produk.Harga || Produk.Harga_Produk}
                </h2>
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700">Jumlah</label>
                  <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    defaultValue={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-gray-700">Tanggal Pengiriman</label>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-start items-start md:justify-end md:items-end">
                  <div className="grid grid-cols-2 gap-2">
                    {Produk.Stok === 0 ? (
                      <button
                        className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                        onClick={handlePreOrderorOrder}
                      >
                        Pre Order
                      </button>
                    ) : (
                      <button
                        className="block text-center w-full p-3 mt-4 bg-primary text-white uppercase font-semibold rounded"
                        onClick={handlePreOrderorOrder}
                      >
                        Buy
                      </button>
                    )}
                    <button
                      className="block text-center w-full p-3 mt-4 bg-accent text-white uppercase font-semibold rounded"
                      onClick={() => handleAddToCart(Produk)}
                    >
                      <FaCartPlus className="inline-block" />
                    </button>
                  </div>
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
