import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeProduk, sortProduk } from "../../../slicer/slicer_checkout";
import { Poin } from "../../../utils/Poin";
import { getTanggalLahir } from "../../../api/customer/customer_query";
import { useQuery } from "react-query";

const Checkout = () => {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state?.checkout.Produk);
  const customer = JSON.parse(localStorage.getItem("customer"));

  const { data: TanggalLahirData } = useQuery(
    ["tanggalLahir", customer.Email],
    () => getTanggalLahir(customer.Email)
  );

  console.log(TanggalLahirData);

  const PoinCustomer = new Poin(TanggalLahirData?.Tanggal_Lahir);

  const isDoublePoin = PoinCustomer.doublePoints();

  useEffect(() => {
    dispatch(sortProduk());
  }, [dispatch]);

  const handleRemoveProduk = (date, index) => {
    const itemIndex = checkout.findIndex(
      (item, idx) => idx === index && item.Tanggal_Pengiriman === date
    );
    dispatch(removeProduk(itemIndex));
  };

  const groupedByDate = checkout.reduce((groups, item) => {
    const date = item.Tanggal_Pengiriman;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const calculateCostAndPoints = (items) => {
    const totalCost = items.reduce(
      (acc, curr) => acc + curr.Harga * curr.Jumlah,
      0
    );

    if (isDoublePoin) {
      const totalPoints = Poin.count(totalCost) * 2;
      return { totalCost, totalPoints };
    }

    const totalPoints = Poin.count(totalCost);
    return { totalCost, totalPoints };
  };

  const [openDates, setOpenDates] = useState({});

  const toggleDateGroup = (date) => {
    setOpenDates((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  const handlePesanan = (date, items) => {
    console.log(`Handling order for date: ${date}`);
    console.log(`Items:`, items);
    const JsonItem = JSON.stringify(items);
    console.log(JsonItem);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4">
      <div className="p-2 lg:p-0 flex flex-col gap-4 w-full lg:w-1/3">
        {/* Render grouped items by date */}
        {Object.entries(groupedByDate).map(([date, items], dateIndex) => {
          const { totalCost, totalPoints } = calculateCostAndPoints(items);

          return (
            <div
              key={dateIndex}
              className="collapse border border-base-300 bg-base-200 collapse-arrow"
            >
              <input
                type="checkbox"
                id={`collapse-${date}`}
                checked={openDates[date]}
                onChange={() => toggleDateGroup(date)}
                className="hidden"
              />
              <label
                htmlFor={`collapse-${date}`}
                className="collapse-title text-xl font-medium"
              >
                Pengiriman : <span className="font-bold">{date}</span>
              </label>

              <div className="collapse-content">
                {items.map((item, index) => (
                  <div key={index} className="card p-4 bg-gray-100 my-4">
                    <div className="flex flex-row items-center w-full">
                      <img
                        src={item.Gambar}
                        alt="gambar produk"
                        className="w-40"
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="text-md font-semibold">{item.Nama}</h3>
                        <h3 className="text-md font-normal">
                          Rp. {item.Harga}
                        </h3>
                        <h3 className="text-md font-normal">
                          Jumlah: {item.Jumlah} produk
                        </h3>
                      </div>
                      <div className="ml-auto">
                        <FaTrashAlt
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemoveProduk(date, index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex flex-row justify-between items-end">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold">
                      Total Pembayaran: Rp. {totalCost}
                    </h3>
                    <h3 className="text-md font-normal">{totalPoints} Poin</h3>
                  </div>
                  <button
                    className="btn btn-primary text-white"
                    onClick={() => handlePesanan(date, items)}
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
