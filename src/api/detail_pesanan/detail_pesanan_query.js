import Axios from "axios";
import { CUSTOMER_ROUTES } from "../../constant/Routes";

export const AddDetailPemesanan = async (data) => {
    const token = localStorage.getItem("token");
    const res = await Axios.post(CUSTOMER_ROUTES.DETAIL_PESANAN, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}


export const getPesananSelesaiByCustomer = async (Email) => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_PesananSelesaiWithDetailPesananAndTanggal}/${Email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export const getPesananOnGoingByCustomer = async (Email) => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_PesananOnGoing}/${Email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export const getPesananDitolakByCustomer = async (Email) => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_PesananDitolak}/${Email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}