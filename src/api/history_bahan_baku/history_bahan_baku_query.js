import { MO_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getHistoryBahanBaku = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(MO_ROUTES.getHistoryBahanBaku, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;

}