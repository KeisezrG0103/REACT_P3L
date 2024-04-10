import  Axios  from "axios";
import { ADMIN_ROUTES } from "../../constant/Routes";
import { TOKEN } from "../../constant/Routes";

export const getProduk = async () => {
  const response = await Axios.get(ADMIN_ROUTES.PRODUK, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const addProduk = async (data) => {
  const response = await Axios.post(ADMIN_ROUTES.PRODUK, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export const editProduk = async (data, id) => {
  const response = await Axios.put(`${ADMIN_ROUTES.PRODUK}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export const deleteProduk = async (id) => {
  const response = await Axios.delete(`${ADMIN_ROUTES.PRODUK}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}