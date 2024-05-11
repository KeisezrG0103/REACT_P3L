import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideNavPembelian from "../../../components/SideNavPembelian";

export const breadCrumbPembelian = [
  {
    name: "Saat Ini",
    link: "/Pembelian/OnGoing",
  },
  {
    name: "Selesai",
    link: "/Pembelian/Selesai",
  },
  {
    name: "Ditolak",
    link: "/Pembelian/Ditolak",
  },
];

const Pembelian = () => {
  const location = useLocation();

  return (
    <div className="container mx-auto">
      <div className="flex flex-row gap-4">
        <div className="hidden lg:flex flex-col gap-4">
          <SideNavPembelian />
        </div>
        <div className="flex flex-col flex-1">
          <div className="card flex flex-col lg:flex-row justify-start gap-4">
            <h1 className="text-left text-2xl font-semibold text-black">
              Pembelian
            </h1>
          </div>
          <div className="flex flex-row gap-4 my-4">
            {breadCrumbPembelian.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className={`${
                  location.pathname === item.link
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } px-4 py-2 mt-2 text-sm font-semibold rounded hover:text-primary hover:bg-gray-100`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Outlet />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Pembelian;
