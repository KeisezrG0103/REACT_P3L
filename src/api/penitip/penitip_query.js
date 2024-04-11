import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";
export const getPenitip = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.PENITIP, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
