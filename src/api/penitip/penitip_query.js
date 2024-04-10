import { TOKEN } from "../../constant/Routes";
import { ADMIN_ROUTES } from "../../constant/Routes";
import Axios from "axios";
export const getPenitip = async () => {
    const response = await Axios.get(ADMIN_ROUTES.PENITIP, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
}
