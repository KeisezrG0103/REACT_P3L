import { TOKEN, CUSTOMER_ROUTES } from "../../constant/Routes"
import axios from "axios"

const currentUser = JSON.parse(localStorage.getItem('customer'))

export const getCurrentCustomer = async () => {
  try {
    const response = await axios.get(`${CUSTOMER_ROUTES.DETAIL_PROFILE}/${currentUser.Email}`, {
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

export const updateCustomer = async (data) => {
  try {
    const response = await axios.put(`${CUSTOMER_ROUTES.UPDATE_PROFILE}/${currentUser.Email}`, {
      Nama: data.Nama,
      Email: data.Email,
      Password: data.Password,
      Tanggal_Lahir: data.Tanggal_Lahir,
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

export const getHistoryCustomer = async () => {
  try {
    const response = await axios.get(`${CUSTOMER_ROUTES.HISTORY}/${currentUser.Email}`, {
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