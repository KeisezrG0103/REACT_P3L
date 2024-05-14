import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    No_Nota: '',
    isOpen: false,
};

const NotaSlice = createSlice({
    name: 'NotaSlice',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isOpen = action.payload;
        },
        setNoNota: (state, action) => {
            state.No_Nota = action.payload;
        },
    },
});

export const { setModal, setNoNota } = NotaSlice.actions;
export default NotaSlice.reducer;
