import Axios  from "axios";
import { ADMIN_ROUTES } from "../../constant/Routes";


export const getHampers = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.HAMPERS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const addHampers = async ({data}) => {

    
    
    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.HAMPERS, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editHampers = async ({ data, id }) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.HAMPERS}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export const deleteHampers = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.HAMPERS}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}