import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    item : {},
   isOpen : false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isOpen = action.payload;
        },
        setItems: (state, action) => {
            state.item = action.payload;
        },
    },
});

export const {setModal, setItems} = modalSlice.actions;
export default modalSlice.reducer;
