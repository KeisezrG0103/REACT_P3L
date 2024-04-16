import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";

export const getBahanBaku = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.BAHAN_BAKU, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}