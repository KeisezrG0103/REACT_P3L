import axios from "axios";
import { MO_ROUTES, TOKEN } from "../../constant/Routes";

export const getKaryawan = async () => {
  try {
    const response = await axios.get(MO_ROUTES.KARYAWAN, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export const addKaryawan = async (data) => {
  try {
    const response = await axios.post(MO_ROUTES.KARYAWAN, {
      Nama: data.Nama,
      Role_Id: data.Role_Id
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export const deleteKaryawan = async (id) => {
  try {
    const response = await axios.delete(`${MO_ROUTES.KARYAWAN}/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export const updateKaryawan = async (data, id) => {
  try {
    const response = await axios.put(`${MO_ROUTES.KARYAWAN}/${id}`, {
      Nama: data.Nama,
      Role_Id: data.Role_Id
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}
