import { FcViewDetails } from "react-icons/fc";
import { GiCakeSlice } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { BsFillBoxFill } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa"
import { FaHistory } from "react-icons/fa";
import { PiEggCrackFill } from "react-icons/pi"
import { BsPersonFillCheck } from "react-icons/bs";
import { FaBook } from "react-icons/fa";

export const ADMIN_FEATURES = {
  DASHBOARD: {
    name: "Dashboard",
    logo: <RxDashboard />,
    route: "/dashboard/admin/",
  },
  PRODUK: {
    name: "Produk",
    logo: <GiCakeSlice />,
    route: "/dashboard/admin/produk",
  },
  HAMPERS: {
    name: "Hampers",
    logo: <IoBag />,
    route: "/dashboard/admin/hampers",
  },
  BAHAN_BAKU: {
    name: "Bahan Baku",
    logo: <PiEggCrackFill />,
    route: "/dashboard/admin/bahan_baku",
  },
 
  CUSTOMER:{
    name: "Customer",
    logo: <IoPerson />,
    route: "/dashboard/admin/customer",
  },
  HISTORY:{
    name: "Histori Pesanan",
    logo: <FaHistory />,
    route: "/dashboard/admin/history",
  },
  RESEP:{
    name: "Resep",
    logo: <FaBook />,
    route: "/dashboard/admin/Resep",
  },
  
};

export const MO_FEATURES = {
  DASHBOARD: {
    name: "Dashboard",
    logo: <RxDashboard />,
    route: "/dashboard/MO/",
  },
  PENGADAAN_BAHAN_BAKU: {
    name: "Pengadaan bahan baku",
    logo: <IoReceiptOutline />,
    route: "/dashboard/MO/pengadaanBahanBaku",
  },

  PENITIP: {
    name: "Penitip",
    logo: <BsFillBoxFill />,
    route: "/dashboard/MO/penitip",
  },
  PENGELUARAN:{
    name: "Pengeluaran",
    logo: <FaMoneyBillAlt/>,
    route: "/dashboard/MO/pengeluaran",
  },
  MANAGE_KARYAWAN: {
    name: "Karyawan",
    logo: <BsPersonFillCheck />,
    route: '/dashboard/MO/karyawan'
  }
};

export const OWNER_FEATURES = {
  DASHBOARD: {
    name: "Dashboard",
    logo: <RxDashboard />,
    route: "/dashboard/owner/"
  },
  LAPORAN: {
    name: "Laporan",
    logo: <FcViewDetails />,
    route: "/dashboard/owner/laporan",
  },
  GAJI_DAN_BONUS: {
    name: "Gaji dan Bonus",
    logo: <FaMoneyBillAlt />,
    route: "/dashboard/owner/gaji_dan_bonus",
  }
};
