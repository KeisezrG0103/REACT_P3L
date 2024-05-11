import React from "react";
import { Link } from "react-router-dom";
import { NavigationPembelian } from "../constant/Routes";
import { getCustomerByEmail } from "../api/customer/customer_query";
import { useQuery } from "react-query";

const SideNavPembelian = () => {
  const customer = JSON.parse(localStorage?.getItem("customer"));
  const { data: customerData, isLoading } = useQuery(
    ["customer", customer?.Email],
    () => getCustomerByEmail(customer?.Email),
    {
      enabled: customer?.Email ? true : false,
    }
  );

  console.log("customer", customerData);

  return (
    <div>
      <div className="flex items-center justify-start px-4 gap-4 border-gray-50-2 border-gray-600 shadow-md">
        <img
          src="https://cdn-8.motorsport.com/images/mgl/YP3wdKQ2/s800/fabio-quartararo-yamaha-factor.jpg"
          alt="profile"
          className="p-2 w-20 h-20 rounded-full"
        />
        {isLoading ? (
          <div className="skeleton h-4 w-28"></div>
        ) : (
          <h1 className="text-xl font-semibold text-black">
            {customerData?.data.Nama}
          </h1>
        )}
      </div>

      <div className="flex flex-col p-4 border-gray-50-2 border-gray-600 shadow-md">
        {isLoading ? (
          <div className="skeleton h-4 w-28"></div>
        ) : (
          <h2 className="text-md font-normal text-black">
            Poin : {customerData?.data.Total_Poin}
          </h2>
        )}

        {isLoading ? (
          <div className="skeleton h-4 w-28"></div>
        ) : (
          <h2 className="text-md font-normal text-black">
            Saldo : Rp.{" "}
            {customerData?.data.Total_Saldo == null
              ? 0
              : customerData?.data.Total_Saldo}
          </h2>
        )}
      </div>
      <div className="flex flex-col p-4 border-gray-50-2 border-gray-600 shadow-md">
        <h2 className="text-lg font-semibold text-black">Menu</h2>
        {NavigationPembelian.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="px-4 py-2 mt-2 text-sm font-semibold rounded hover:text-primary hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavPembelian;
