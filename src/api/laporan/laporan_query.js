import { LAPORAN_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getLaporanBahanBaku = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(LAPORAN_ROUTES.LAPORAN_BAHAN_BAKU, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getLaporanProdukPerBulan = async (bulan, year) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${LAPORAN_ROUTES.LAPORAN_PRODUK_PER_BULAN}/${bulan}/${year}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
    return response.data;
}

export const getLaporanPresensiPerBulan = async (tanggal) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${LAPORAN_ROUTES.LAPORAN_PRESENSI}/${tanggal}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
    return response.data;
}

export const getLaporanKeuanganPerBulan = async (tanggal) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${LAPORAN_ROUTES.LAPORAN_KEUANGAN}/${tanggal}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
    return response.data;
}

export const getLaporanPenitipPerBulan = async (tanggal) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${LAPORAN_ROUTES.LAPORAN_PENITIP}/${tanggal}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
    return response.data;
}