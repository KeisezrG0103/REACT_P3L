import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  noNota: null,
  bukti: null,
};

const buktiSlice = createSlice({
  name: 'bukti',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.noNota = action.payload.noNota;
      state.bukti = action.payload.bukti;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.noNota = null;
      state.bukti = null;
    },
  },
});

export const { setModal, closeModal } = buktiSlice.actions;
export default buktiSlice.reducer;