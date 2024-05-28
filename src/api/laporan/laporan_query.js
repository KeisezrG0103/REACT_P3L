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
