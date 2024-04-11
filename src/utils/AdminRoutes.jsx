import { useNavigate, Outlet, redirect, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignUp";

const AdminRoutes = () => {

    const karyawan_string = localStorage.getItem("karyawan");
    const karyawan = JSON.parse(karyawan_string);

    const navigate = useNavigate();

    if(karyawan?.role == "Admin"){
        return <Outlet />;
    }

    if(!karyawan){
        return  <Navigate to="/auth/signinKaryawan" />;
    }



    

  };

export default AdminRoutes;