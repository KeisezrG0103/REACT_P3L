import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";

export const addResep = async ({data}) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.Resep, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const editResep = async ({ data, id }) => {

    const token = localStorage.getItem("token");
    const response = await Axios.post(`${ADMIN_ROUTES.Resep}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deleteResep = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.Resep}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getResep = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.Resep, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getDetail = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.Detail_resep, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}