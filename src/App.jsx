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
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import Pengadaan_Bahan_Baku from "./pages/dashboard/MO/Pengadaan_Bahan_Baku/PengadaanBahanBaku.jsx";
import DetailHampers from "./pages/dashboard/ADMIN/Detail_Hampers/DetailHampers.jsx";
import Hampers from "./pages/dashboard/ADMIN/Hampers/Hampers.jsx";
import Produk from "./pages/dashboard/ADMIN/Produk/Produk.jsx";

function App() {
  const karyawan_Json = localStorage.getItem("karyawan");

  const karyawan = karyawan_Json ? JSON.parse(karyawan_Json) : {};

  console.log(karyawan.role);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Layout />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signinKaryawan" element={<SignIn />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard/Admin"
              element={<ProtectedRoutes karyawan={karyawan.role === "Admin"} />}
            >
              <Route path="/dashboard/Admin/" element={<Index_Admin />} />
              <Route path="/dashboard/Admin/produk" element={<Produk />} />
              <Route path="/dashboard/Admin/hampers" element={<Hampers />} />
              <Route
                path="/dashboard/Admin/detailHampers"
                element={<DetailHampers />}
              />
            </Route>

            <Route
              path="/dashboard/MO"
              element={<ProtectedRoutes karyawan={karyawan.role === "MO"} />}
            >
              <Route path="/dashboard/MO/" element={<Index_MO />} />
              <Route
                path="/dashboard/MO/pengadaanBahanBaku"
                element={<Pengadaan_Bahan_Baku />}
              />
            </Route>

            <Route
              path="/dashboard/Owner"
              element={<ProtectedRoutes karyawan={karyawan.role === "Owner"} />}
            >
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
