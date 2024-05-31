import { GiCakeSlice } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { BsFillBoxFill } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa";
import { PiEggCrackFill } from "react-icons/pi";
import { FaListCheck } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import laporan_penjualan_produk from "../pages/laporan/Laporan_Penjualan_Produk";

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

  CUSTOMER: {
    name: "Customer",
    logo: <IoPerson />,
    route: "/dashboard/admin/customer",
  },

  RESEP: {
    name: "Resep",
    logo: <IoReceiptOutline />,
    route: "/dashboard/admin/resep",
  },

  SALDO: {
    name: "Saldo",
    logo: <MdAccountBalanceWallet />,
    route: "/dashboard/admin/saldo",
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
  PENGELUARAN: {
    name: "Pengeluaran",
    logo: <FaMoneyBillAlt />,
    route: "/dashboard/MO/pengeluaran",
  },
  KONFIRMASI_PEMBELIAN: {
    name: "Konfirmasi Pembelian",
    logo: <FaListCheck />,
    route: "/dashboard/MO/konfirmasipembelian",
  },
  PROSES_PEMBELIAN: {
    name: "Proses Pembelian",
    logo: <IoReceiptOutline />,
    route: "/dashboard/MO/prosespembelian",
  },

  HISTORY_BAHAN_BAKU: {
    name: "History Bahan Baku",
    logo: <FaListCheck />,
    route: "/dashboard/MO/history_bahan_baku",
  },

  LAPORAN_PENJUALAN_PRODUK: {
    name: "Laporan Penjualan Produk",
    logo: <FaListCheck />,
    route: "/dashboard/MO/laporan_penjualan_produk",
  },
  LAPORAN_STOK_BAHAN_BAKU: {
    name: "Laporan Stok Bahan Baku",
    logo: <FaListCheck />,
    route: "/dashboard/MO/laporan_stok_bahan_baku",
  },
  LAPORAN_PRESENSI: {
    name: "Laporan Presensi",
    logo: <FaListCheck />,
    route: "/dashboard/MO/laporan_presensi",
  },
};

export const OWNER_FEATURES = {
  LAPORAN: "Laporan",
  LAPORAN_PENJUALAN_PRODUK: {
    name: "Laporan Penjualan Produk",
    logo: <FaListCheck />,
    route: "/dashboard/owner/laporan_penjualan_produk",
  },
  LAPORAN_STOK_BAHAN_BAKU: {
    name: "Laporan Stok Bahan Baku",
    logo: <FaListCheck />,
    route: "/dashboard/owner/laporan_stok_bahan_baku",
  },
  LAPORAN_PRESENSI: {
    name: "Laporan Presensi",
    logo: <FaListCheck />,
    route: "/dashboard/owner/laporan_presensi",
  },
};
