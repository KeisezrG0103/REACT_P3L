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

export const editProduk = async ({data, id}) => {
  console.log("ID:", id); // Check the value of id
  console.log("Data:", data); // Check the value of data  
  const datas = {
    Nama: data.Nama,
    Harga: data.Harga,
    Stok: data.Stok,
    Kategori_Id: data.Kategori_Id,
    Penitip_Id: data.Penitip_Id,
    Satuan: data.Satuan,
  };

  const response = await Axios.put(`${ADMIN_ROUTES.PRODUK}/${id}`, datas, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};


export const deleteProduk = async (id) => {
  const response = await Axios.delete(`${ADMIN_ROUTES.PRODUK}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}