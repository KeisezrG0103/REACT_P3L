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
import Penitip from "./pages/dashboard/ADMIN/Penitip/Penitip.jsx";
import AdminRoutes from "./utils/AdminRoutes.jsx";
import MORoutes from "./utils/MORoutes.jsx";
import OwnerRoutes from "./utils/OwnerRoutes.jsx";
import Tambah_Edit_Hampers from "./pages/dashboard/ADMIN/Hampers/Tambah_Edit_Hampers.jsx";
import Tambah_Edit_PengadaanBahanBaku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/Tambah_Edit_PengadaanBahanBaku.jsx";
import Tambah_Edit_Bahan_Baku from "./pages/dashboard/ADMIN/Bahan_Baku/Tambah_Edit_Bahan_Baku.jsx";
import Tambah_Edit_Produk from "./pages/dashboard/ADMIN/Produk/Tambah_Edit_Produk.jsx";
import IsAuthRoute from "./utils/IsAuthRoute.jsx";
import Tambah_Edit_Penitip from "./pages/dashboard/ADMIN/Penitip/Tambah_Edit_Penitip.jsx";
import Pengeluaran from "./pages/dashboard/ADMIN/Pengeluaran/Pengeluaran.jsx";
import Tambah_Edit_Pengeluaran from "./pages/dashboard/ADMIN/Pengeluaran/Tambah_Edit_Pengeluaran.jsx";
import Customer from "./pages/dashboard/ADMIN/Customer/Customer.jsx";
import HomePage_layout from "./pages/customer/HomePage_layout.jsx";
import Home from "./pages/customer/Home/Home.jsx";
import Shop from "./pages/customer/Shop/Shop.jsx";
import About from "./pages/customer/About/About.jsx";
import Contact from "./pages/customer/Contact/Contact.jsx";
import Resep from "./pages/dashboard/ADMIN/Resep/Resep.jsx";
import Tambah_Edit_Resep from "./pages/dashboard/ADMIN/Resep/Tambah_Edit_Resep.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  element={<HomePage_layout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/auth" element={<IsAuthRoute />}>
            <Route element={<Layout />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signinKaryawan" element={<SignIn />} />
            </Route>
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/Admin" element={<AdminRoutes />}>
              <Route path="/dashboard/Admin/" element={<Index_Admin />} />
              <Route path="/dashboard/Admin/produk" element={<Produk />} />
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

              <Route path="/dashboard/Admin/penitip" element={<Penitip />} />

              <Route
                path="/dashboard/Admin/Penitip/tambah"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/Admin/Penitip/:id"
                element={<Tambah_Edit_Penitip />}
              />

              <Route
                path="/dashboard/Admin/pengeluaran"
                element={<Pengeluaran />}
              />

              <Route
                path="/dashboard/Admin/pengeluaran/tambah"
                element={<Tambah_Edit_Pengeluaran />}
              />

              <Route
                path="/dashboard/Admin/pengeluaran/:id"
                element={<Tambah_Edit_Pengeluaran />}
              />

              <Route path="/dashboard/Admin/customer" element={<Customer />} />

              <Route
                path="/dashboard/Admin/resep"
                element={<Resep />}
              />

              <Route
                path="/dashboard/Admin/resep/:id"
                element={<Tambah_Edit_Resep />}
              />

              <Route
                path="/dashboard/Admin/resep/tambah"
                element={<Tambah_Edit_Resep />}
              />
            </Route>

            <Route path="/dashboard/MO" element={<MORoutes />}>
              <Route path="/dashboard/MO/" element={<Index_MO />} />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku"
                element={<Pengadaan_Bahan_Baku />}
              />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku/:id"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />

              <Route
                path="/dashboard/MO/pengadaanBahanBaku/tambah"
                element={<Tambah_Edit_PengadaanBahanBaku />}
              />
            </Route>

            <Route path="/dashboard/Owner" element={<OwnerRoutes />}>
              <Route path="/dashboard/Owner/" element={<Index_Owner />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
