import { CUSTOMER_ROUTES, MO_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getLatestNota = async (month) => {
    const token = localStorage.getItem("token");

    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_LATEST_NOTA}/${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const generateNoNota = async (month) => {
    const token = localStorage.getItem("token");

    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_NO_NOTA}/${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const pesanProduk = async (data) => {
    const token = localStorage.getItem("token");

    const res = await Axios.post(CUSTOMER_ROUTES.PESAN_PRODUK, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    return res.data;

}

export const getNotaByNoNota = async (noNota) => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${CUSTOMER_ROUTES.GET_NOTA_BY_NO_NOTA}/${noNota}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const getDaftarPesananYangDiprosesHariIni = async (tanggalBesok) => {
    const token = localStorage.getItem("token");
    const res = await Axios.get(`${MO_ROUTES.getDaftarPesananYangDiprosesHariIni}/${tanggalBesok}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

