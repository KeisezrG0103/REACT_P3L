import { MO_ROUTES } from "../../../constant/Routes";
import Axios from "axios";


export const getDaftarPesananToConfirm = async () => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(MO_ROUTES.GET_DAFTAR_PESANAN_TO_CONFIRM, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const konfirmasiPesanan = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await Axios.put(`${MO_ROUTES.CONFIRM_PESANAN}/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      
    } catch (error) {
        console.error('Gagal mengonfirmasi pesanan:', error);
        throw error;
    }
};

export const tolakPesanan = async (id) => {
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