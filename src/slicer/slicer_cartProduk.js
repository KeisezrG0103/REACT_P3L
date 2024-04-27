import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
    Produk: [],
};

const cartProdukSlice = createSlice({
    name: "cartProduk",
    initialState,
    reducers: {
        setProduk: (state, action) => {

            if (Array.isArray(state.Produk)) {
                state.Produk.push(action.payload);
            } else {

                state.Produk = [action.payload];
            }
        },
        resetProduk: (state) => {
            state.Produk = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state, action) => {
            if (action.payload && action.payload.Produk !== undefined) {
                if (Array.isArray(action.payload.Produk)) {
                    state.Produk = action.payload.Produk;
                } else {
                    state.Produk = [];
                }
            } else {
                state.Produk = [];
            }
        });
    },
});

export const { setProduk, resetProduk } = cartProdukSlice.actions;
export default cartProdukSlice.reducer;
