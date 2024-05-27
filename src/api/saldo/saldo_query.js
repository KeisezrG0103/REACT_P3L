import Axios from "axios";
import { ADMIN_ROUTES } from "../../constant/Routes";

export const getDaftarSaldoToConfirm = async () => {

  const token = localStorage.getItem("token");
  const response = await Axios.get(ADMIN_ROUTES.GET_SALDO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
 
  return response.data;
};

export const konfirmasiSaldo = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await Axios.put(`${ADMIN_ROUTES.CONFIRM_SALDO}/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      
    } catch (error) {
        console.error('Gagal mengonfirmasi saldo:', error);
        throw error;
    }
};

/*
export const tolakSaldo = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await Axios.put(`${MO_ROUTES.TOLAK_PESANAN}/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
       
    } catch (error) {
        console.error('Gagal menolak pesanan:', error);
        throw error;
    }
};

*/