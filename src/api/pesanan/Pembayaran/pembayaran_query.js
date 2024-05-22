import { CUSTOMER_ROUTES } from "../../../constant/Routes";
import Axios from "axios";

export const addBuktiBayar = async (noNota, file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("Bukti_Pembayaran", file);

  const res = await Axios.post(`${CUSTOMER_ROUTES.ADD_BUKTI_BAYAR}/${noNota}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
