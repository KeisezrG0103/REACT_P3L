import "./pages/auth/Layout_Auth.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Layout from "./pages/auth/Layout_Auth.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NotFound from "./pages/not_found/NotFound.jsx";
import Index_Owner from "./pages/dashboard/OWNER/Index.jsx";
import Index_MO from "./pages/dashboard/MO/Index.jsx";
import Index_Admin from "./pages/dashboard/ADMIN/Index.jsx";
import Pengadaan_Bahan_Baku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/PengadaanBahanBaku.jsx";
import Hampers from "./pages/dashboard/ADMIN/Hampers/Hampers.jsx";
import Produk from "./pages/dashboard/ADMIN/Produk/Produk.jsx";
import Bahan_Baku from "./pages/dashboard/ADMIN/Bahan_Baku/Bahan_Baku.jsx";
import Penitip from "./pages/dashboard/MO/Penitip/Penitip.jsx";
import AdminRoutes from "./utils/AdminRoutes.jsx";
import MORoutes from "./utils/MORoutes.jsx";
import OwnerRoutes from "./utils/OwnerRoutes.jsx";
import Tambah_Edit_Hampers from "./pages/dashboard/ADMIN/Hampers/Tambah_Edit_Hampers.jsx";
import Tambah_Edit_PengadaanBahanBaku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/Tambah_Edit_PengadaanBahanBaku.jsx";
import Tambah_Edit_Bahan_Baku from "./pages/dashboard/ADMIN/Bahan_Baku/Tambah_Edit_Bahan_Baku.jsx";
import Tambah_Edit_Produk from "./pages/dashboard/ADMIN/Produk/Tambah_Edit_Produk.jsx";
import IsAuthRoute from "./utils/IsAuthRoute.jsx";
import Tambah_Edit_Penitip from "./pages/dashboard/MO/Penitip/Tambah_Edit_Penitip.jsx";
import Pengeluaran from "./pages/dashboard/MO/Pengeluaran/Pengeluaran.jsx";
import Tambah_Edit_Pengeluaran from "./pages/dashboard/MO/Pengeluaran/Tambah_Edit_Pengeluaran.jsx";
import Customer from "./pages/dashboard/ADMIN/Customer/Customer.jsx";
import History from "./pages/dashboard/ADMIN/History/History.jsx";
import HomePage_layout from "./pages/customer/HomePage_layout.jsx";
import Home from "./pages/customer/Home/Home.jsx";
import Shop from "./pages/customer/Shop/Shop.jsx";
import About from "./pages/customer/About/About.jsx";
import Contact from "./pages/customer/Contact/Contact.jsx";
import ViewProduk from "./pages/customer/Shop/ViewProduk.jsx";
import Checkout from "./pages/customer/Shop/Checkout.jsx";
import ForgotPassword from "./pages/customer/Forgot_Password/Forgot_Password.jsx";
import VerifyOTP from "./pages/customer/Forgot_Password/Verify_OTP.jsx";
import ResetPassword from "./pages/customer/Forgot_Password/Reset_Password.jsx";
import ViewHampers from "./pages/customer/Shop/ViewHampers.jsx";
import Pembelian from "./pages/customer/Pembelian/Pembelian.jsx";
import Profile from "./pages/customer/Profile/Profile.jsx";
import Selesai from "./pages/customer/Pembelian/Selesai/Selesai.jsx";
import OnGoing from "./pages/customer/Pembelian/OnGoing/OnGoing.jsx";
import Ditolak from "./pages/customer/Pembelian/Ditolak/Ditolak.jsx";
import Proses_Pembelian from "./pages/dashboard/MO/Proses_Pembelian/Proses_Pembelian.jsx";
import Konfirmasi_Pembelian from "./pages/dashboard/MO/Konfirmasi_Pembelian/Konfirmasi_Pembelian.jsx";
import Resep from "./pages/dashboard/ADMIN/Resep/Resep.jsx";
import History_Bahan_Baku from "./pages/dashboard/MO/History_Bahan_Baku/History_Bahan_Baku.jsx";
import Konfirmasi_Saldo from "./pages/dashboard/MO/Konfirmasi_Saldo/Konfirmasi_Saldo.jsx";
import Laporan_Penjualan_Produk from "./pages/laporan/Laporan_Penjualan_Produk.jsx";
import Laporan_Stok_Bahan_Baku from "./pages/laporan/Laporan_Stok_Bahan_Baku.jsx";
import Laporan_Presensi from "./pages/laporan/Laporan_Presensi.jsx";
import Laporan_Keuangan from "./pages/laporan/Laporan_Keuangan.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage_layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Produk/:id" element={<ViewProduk />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Hampers/:id" element={<ViewHampers />} />
            <Route element={<Pembelian />}>
              <Route path="/Pembelian/OnGoing" element={<OnGoing />} />
              <Route path="/Pembelian/Selesai" element={<Selesai />} />
              <Route path="/Pembelian/Ditolak" element={<Ditolak />} />
            </Route>
            <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<IsAuthRoute />}>
            <Route element={<Layout />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signinKaryawan" element={<SignIn />} />
            </Route>
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/Admin" element={<AdminRoutes />}>
              <Route path="/dashboard/Admin/" element={<Index_Admin />} />
              <Route path="/dashboard/Admin/produk" element={<Produk />} />
              <Route path="/dashboard/Admin/resep" element={<Resep />} />
              <Route
                path="/dashboard/Admin/produk/:id"
                element={<Tambah_Edit_Produk />}
              />
              <Route
                path="/dashboard/Admin/produk/tambah"
                element={<Tambah_Edit_Produk />}
              />

              <Route path="/dashboard/Admin/hampers" element={<Hampers />} />
              <Route
                path="/dashboard/Admin/hampers/:id"
                element={<Tambah_Edit_Hampers />}
              />
              <Route
                path="/dashboard/Admin/hampers/tambah"
                element={<Tambah_Edit_Hampers />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku"
                element={<Bahan_Baku />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku/tambah"
                element={<Tambah_Edit_Bahan_Baku />}
              />

              <Route
                path="/dashboard/Admin/bahan_baku/:id"
                element={<Tambah_Edit_Bahan_Baku />}
              />

              <Route
                path="/dashboard/Admin/saldo"
                element={<Konfirmasi_Saldo />}
              />

              <Route path="/dashboard/Admin/customer" element={<Customer />} />
            </Route>

            <Route path="/dashboard/MO" element={<MORoutes />}>
              <Route path="/dashboard/MO/" element={<Index_MO />} />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku"
                element={<Pengadaan_Bahan_Baku />}
              />
              <Route
                path="/dashboard/MO/Laporan_Penjualan_Produk"
                element={<Laporan_Penjualan_Produk />}
              />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku/:id"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />
              <Route
                path="/dashboard/MO/history_bahan_baku"
                element={<History_Bahan_Baku />}
              />

              <Route
                path="/dashboard/MO/pengadaanBahanBaku/tambah"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />

              <Route path="/dashboard/MO/penitip" element={<Penitip />} />
              <Route
                path="/dashboard/MO/prosesPembelian"
                element={<Proses_Pembelian />}
              />

              <Route
                path="/dashboard/MO/konfirmasipembelian"
                element={<Konfirmasi_Pembelian />}
              />

              <Route
                path="/dashboard/MO/Penitip/tambah"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/MO/Penitip/:id"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/MO/pengeluaran"
                element={<Pengeluaran />}
              />

              <Route
                path="/dashboard/MO/pengeluaran/tambah"
                element={<Tambah_Edit_Pengeluaran />}
              />

              <Route
                path="/dashboard/MO/pengeluaran/:id"
                element={<Tambah_Edit_Pengeluaran />}
              />

              <Route
                path="/dashboard/MO/Laporan_Stok_Bahan_Baku"
                element={<Laporan_Stok_Bahan_Baku />}
              />
  
              <Route
                path="/dashboard/MO/Laporan_Presensi"
                element={<Laporan_Presensi />}
              />

              <Route
                path="/dashboard/MO/Laporan_Keuangan"
                element={<Laporan_Keuangan />}
              />
            </Route>

            

            <Route path="/dashboard/Owner" element={<OwnerRoutes />}>
              <Route path="/dashboard/Owner/" element={<Index_Owner />} />
              <Route
                path="/dashboard/Owner/Laporan_Penjualan_Produk"
                element={<Laporan_Penjualan_Produk />}
              />
              <Route
                path="/dashboard/Owner/Laporan_Stok_Bahan_Baku"
                element={<Laporan_Stok_Bahan_Baku />}
              />

              <Route
                path="/dashboard/Owner/Laporan_Presensi"
                element={<Laporan_Presensi />}
              />

              <Route
                path="/dashboard/Owner/Laporan_Keuangan"
                element={<Laporan_Keuangan />}
              />
            </Route>
            
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
