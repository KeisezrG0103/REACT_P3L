import { Navigate, Outlet} from 'react-router-dom';
const IsAuthRoute = ({children}) => {
    const karyawan_string = localStorage.getItem("karyawan");
    const karyawan = JSON.parse(karyawan_string);


  if(!karyawan){
    return <Outlet />;
  }
  return <Navigate to={`/dashboard/${karyawan.role}/`} />;
}

export default IsAuthRoute