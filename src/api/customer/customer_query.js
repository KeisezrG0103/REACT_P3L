import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";


export const getCustomer = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.CUSTOMER, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}