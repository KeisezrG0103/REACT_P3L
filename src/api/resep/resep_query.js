import Axios from "axios";
import { ADMIN_ROUTES } from "../../constant/Routes";

export const getResep = async () => {
    const token = localStorage.getItem("token");

    const res = await Axios.get(ADMIN_ROUTES.GET_RESEP, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}