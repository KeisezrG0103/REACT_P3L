

const BASEURL = "http://localhost:8000";
export const TOKEN = localStorage.getItem("token");

export const ROUTES = {
    LOGIN: BASEURL + "/api/login",
    REGISTER: BASEURL + "/api/register",
    FORGOT: BASEURL + "/api/forgot-password",
    VERIFY: BASEURL + "/api/verify/pin",
    RESET: BASEURL + "/api/reset-password",
    SIGNUPCUSTOMER: BASEURL + "/api/register_customer",
    LOGOUT: BASEURL + "/api/logout",
}


export const ADMIN_ROUTES = {
    PRODUK: BASEURL + "/api/produk",
    HAMPERS: BASEURL + "/api/hampers",
    DETAIL_HAMPERS: BASEURL + "/api/detail_hampers",
    PENITIP: BASEURL + "/api/penitip",
    KATEGORI: BASEURL + "/api/kategori",
    BAHAN_BAKU: BASEURL + "/api/bahan_baku",
    PENGELUARAN: BASEURL + "/api/pengeluaran",
    CUSTOMER: BASEURL + "/api/customer",
    HISTORY: BASEURL + "/api/history",
    GET_RESEP: BASEURL + "/api/resep"
}

export const MO_ROUTES = {
    PENGADAAN_BAHAN_BAKU: BASEURL + "/api/pengadaan_bahan_baku",
    getDaftarPesananYangDiprosesHariIni: BASEURL + "/api/getDaftarPesananYangDiprosesHariIni",
    GET_DAFTAR_PESANAN_TO_CONFIRM: BASEURL + "/api/daftarPesananToConfirm",
    CONFIRM_PESANAN: BASEURL + "/api/konfirmasiPesanan",
    TOLAK_PESANAN: BASEURL + "/api/tolakPesanan",
    GetKekuranganBahanBaku: BASEURL + "/api/GetKekuranganBahanBaku",
    changeStatusToDiproses: BASEURL + "/api/changeStatusToDiproses",
    getHistoryBahanBaku: BASEURL + "/api/getHistoryBahanBaku",
}


export const CUSTOMER_ROUTES = {
    PRODUK_PENITIP: BASEURL + "/api/ProdukPenitip",
    GET_PRODUKNONPENITIPWITHKUOTA: BASEURL + "/api/produkNonPenitipWithKuota",
    GET_KUOTAPRODUKBYIDANDDATE: BASEURL + "/api/produkKuota",
    GET_GETPRODUKBYIDBYDATE: BASEURL + "/api/getProdukByIdWithQuota",
    GET_HAMPERSWITHKUOTA: BASEURL + "/api/getHampersWithProdukAndKuota",
    GET_PRODUKBYHAMPERS: BASEURL + "/api/getProdukInHampersWithKuota",
    GET_HAMPERSBYIDWITHKUOTA: BASEURL + "/api/getHampersByIdWithKuota",
    GET_HAMPERSBYIDKUOTA: BASEURL + "/api/getKuotaHampersById",
    GET_POINPERCUSTOMER: BASEURL + "/api/poin",
    GET_TanggalLahir: BASEURL + "/api/Tanggal_Lahir_Customer",
    GET_LATEST_NOTA: BASEURL + "/api/latestNota",
    GET_NO_NOTA: BASEURL + "/api/generateNoNota",
    PESAN_PRODUK: BASEURL + "/api/pesanProduk",
    DETAIL_PESANAN: BASEURL + "/api/AddDetailPemesanan",
    GET_USER_BY_EMAIL: BASEURL + "/api/customer",
    GET_PesananSelesaiWithDetailPesananAndTanggal: BASEURL + "/api/PesananSelesaiWithDetailPesananAndTanggal",
    GET_PesananOnGoing: BASEURL + "/api/getPesananAndProdukOnGoing",
    GET_PesananDitolak: BASEURL + "/api/getPesananAndProdukDitolak",
    GET_NOTA_BY_NO_NOTA: BASEURL + "/api/getNotaById",
    ADD_BUKTI_BAYAR: BASEURL + "/api/sendBuktiBayar",
    GET_ALAMAT: BASEURL + "/api/getAlamat",
    ADD_ALAMAT: BASEURL + "/api/addAlamat",
}

export const OWNER_ROUTES = {
    LAPORAN: BASEURL + "/api/laporan",
}


export const ROUTES_HOMEPAGE = {
    HOME: {
        name: "Home",
        route: "/"
    },
    Shop: {
        name: "Shop",
        route: "/shop",
    },
    CONTACT: {
        name: "Contact",
        route: "/contact",
    },
    ABOUT: {
        name: "About",
        route: "/about",
    }
}

export const NavigationPembelian = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Checkout",
        link: "/checkout",
    },
    {
        name: "Shop",
        link: "/shop",
    },
];

export const breadCrumbPembelian = [
    {
        name: "Saat Ini",
        link: "/Pembelian/OnGoing",
    },
    {
        name: "Selesai",
        link: "/Pembelian/Selesai",
    },
    {
        name: "Ditolak",
        link: "/Pembelian/Ditolak",
    },
];