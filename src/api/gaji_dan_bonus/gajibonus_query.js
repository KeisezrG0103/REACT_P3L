import axios from "axios";
import { TOKEN, OWNER_ROUTES } from "../../constant/Routes";

export const getGajiBonus = async () => {
  try {
    const response = await axios.get(`${OWNER_ROUTES.GAJI_BONUS}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    
    return {
      success: true,
      data: response.data.data
    }
  } catch (error) {
    return {
      success: false,
      data: error.response.data
    }
  }
}

export const updateGajiBonus = async (data, id) => {
  try {
    const response = await axios.put(`${OWNER_ROUTES.GAJI_BONUS}/${id}`, {
      TotalGaji: data.TotalGaji,
      Bonus: data.Bonus
    }, {
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
      data: error.response.data
    }
  }
}