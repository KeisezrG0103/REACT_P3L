import axios from "axios"
import { KARYAWAN_ROUTES, TOKEN } from "../../constant/Routes"


export const getCurrentKaryawan = async () => {
  const currentKaryawan = JSON.parse(localStorage.getItem('karyawan'))
  try {
    const response = await axios.get(`${KARYAWAN_ROUTES.DETAIL_PROFILE}/${currentKaryawan.Nama}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })

    return {
      success: true,
      data: response.data.data
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}

export const updateProfileKaryawan = async (data) => {
  try {
    const response = await axios.put(`${KARYAWAN_ROUTES.UPDATE_PROFILE}/${data.Id}`, {
      Nama: data.Nama,
      Password: data.Password,
      Role_id: data.Role_Id,
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}