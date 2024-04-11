import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
const initialState = {
    item: {},
    isEdit: false,
};

const isEditProdukSlice = createSlice({
    name: 'isEditProduk',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        resetState: (state, action) => {
            state.item = {};
            state.isEdit = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            return state;
        });
    }
});

export const { setItem, setIsEdit, resetState } = isEditProdukSlice.actions;

export default isEditProdukSlice.reducer;