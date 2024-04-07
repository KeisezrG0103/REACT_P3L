import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({ children, karyawan }) => {
    if(karyawan){
        return <Outlet />;
    }
    return <Navigate to="/auth/signinKaryawan" />;

  };

export default ProtectedRoutes;