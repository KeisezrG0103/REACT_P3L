import Axios from "axios";

import { CUSTOMER_ROUTES } from "../../constant/Routes";

export const GetAlamat = async (email) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${CUSTOMER_ROUTES.GET_ALAMAT}/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const addAlamat = async ({data, Email}) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(`${CUSTOMER_ROUTES.ADD_ALAMAT}/${Email}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}
