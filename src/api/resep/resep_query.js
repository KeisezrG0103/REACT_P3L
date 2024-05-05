import Axios from "axios";

import { ADMIN_ROUTES } from "../../constant/Routes";

export const getProduk = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.PRODUK, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return {
        success: true,
        data: response.data.data
    }

}

export const addResep = async (data) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(ADMIN_ROUTES.Resep, {
        Nama: data.Nama,
        Produk_Id: data.Produk_Id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return {
        success: true,
        data: response.data.data
    }
}

export const editResep = async (data, id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.put(`${ADMIN_ROUTES.Resep}/${id}`, {
        Nama: data.Nama,
        Produk_Id: data.Produk_Id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        success: true,
        data: response.data.data
    }
}

export const deleteResep = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`${ADMIN_ROUTES.Resep}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return {
        success: true,
        data: response.data.data
    }
}

export const getResep = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(ADMIN_ROUTES.Resep, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return {
        success: true,
        data: response.data.data
    }
}

export const getDetail = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${ADMIN_ROUTES.Detail_resep}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return {
        success: true,
        data: response.data.data
    }
}