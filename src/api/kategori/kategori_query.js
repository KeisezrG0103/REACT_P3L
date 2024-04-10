import { TOKEN } from "../../constant/Routes";
import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";

export const getKategori = async () => {
    const response = await Axios.get(ADMIN_ROUTES.KATEGORI, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
}
