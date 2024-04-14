

const BASEURL = "http://localhost:8000";
export const TOKEN = localStorage.getItem("token");

export const ROUTES = {
    LOGIN : BASEURL + "/api/login",
    REGISTER : BASEURL + "/api/register",
}


export const ADMIN_ROUTES = {
    PRODUK : BASEURL + "/api/produk",
    HAMPERS : BASEURL + "/api/hampers",
    DETAIL_HAMPERS : BASEURL + "/api/detail_hampers",
    PENITIP : BASEURL + "/api/penitip",
    KATEGORI : BASEURL + "/api/kategori",
}

export const MO_ROUTES = {
    PENGADAAN_BAHAN_BAKU : BASEURL + "/api/pengadaan_bahan_baku",
}




export const OWNER_ROUTES = {
    LAPORAN : BASEURL + "/api/laporan",
}