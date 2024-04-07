import { FcViewDetails } from "react-icons/fc";
import { GiCakeSlice } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
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
  DETAIL_HAMPERS: {
    name: "Detail Hampers",
    logo: <FcViewDetails />,
    route: "/dashboard/admin/detailHampers",
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
};

export const OWNER_FEATURES = {
  LAPORAN: "Laporan",
};
