import Shop from "../pages/customer/Shop/Shop";


const BASEURL = "http://localhost:8000";
export const TOKEN = localStorage.getItem("token");

export const ROUTES = {
    LOGIN : BASEURL + "/api/login",
    REGISTER : BASEURL + "/api/register",
}

export const CUSTOMER_ROUTES = {
    DETAIL_PROFILE: `${BASEURL}/api/customers_email`,
    UPDATE_PROFILE: `${BASEURL}/api/customerss`,
    HISTORY: `${BASEURL}/api/customers`
}

export const KARYAWAN_ROUTES = {
    DETAIL_PROFILE: `${BASEURL}/api/karyawan_nama`,
    UPDATE_PROFILE: `${BASEURL}/api/password_karyawan`
}


export const ADMIN_ROUTES = {
    PRODUK : BASEURL + "/api/produk",
    HAMPERS : BASEURL + "/api/hampers",
    DETAIL_HAMPERS : BASEURL + "/api/detail_hampers",
    PENITIP : BASEURL + "/api/penitip",
    KATEGORI : BASEURL + "/api/kategori",
    BAHAN_BAKU : BASEURL + "/api/bahan_baku",
    PENGELUARAN: BASEURL + "/api/pengeluaran",
    CUSTOMER: BASEURL + "/api/customer",
    Resep: BASEURL + "/api/resep",
    Detail_resep: BASEURL + "/api/resep",
}

export const MO_ROUTES = {
    PENGADAAN_BAHAN_BAKU : BASEURL + "/api/pengadaan_bahan_baku",
    KARYAWAN: `${BASEURL}/api/karyawan`
}

export const OWNER_ROUTES = {
    LAPORAN : BASEURL + "/api/laporan",
    GAJI_BONUS: `${BASEURL}/api/gaji_karyawan`
}


export const ROUTES_HOMEPAGE = {
    HOME : {
        name : "Home",
        route : "/"
    },
    Shop : {
        name : "Shop",
        route : "/shop",
    },
    CONTACT : {
        name : "Contact",
        route : "/contact",
    },
    ABOUT : {
        name : "About",
        route : "/about",
    }
}