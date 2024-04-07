import  Axios  from "axios";
import { ROUTES } from "../../constant/Routes";

export const loginKaryawan = async ({ Nama, Password }) => {
    try {
        const res = await Axios.post(ROUTES.LOGIN, { Nama, Password });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const loginPelanggan = async ({ Email, Password }) => {
    try {
        const res = await Axios.post(ROUTES.LOGIN, { Email, Password });
        return res.data;
    } catch (error) {
        return error;
    }
}
