import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    item: {},
    isOpen: false,
};

const DetailResep = createSlice({
    name: 'DetailResep',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        resetState: (state, action) => {
            state.item = {};
            state.isOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            return state;
        });
    }
});

export const { setOpen, setItem, resetState } = DetailResep.actions;

export default DetailResep.reducer;
