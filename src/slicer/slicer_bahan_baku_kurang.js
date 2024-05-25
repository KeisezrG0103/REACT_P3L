import { createSlice } from '@reduxjs/toolkit';
import { getBahanBakuKurang } from '../api/pesanan/Konfirmasi/konfirmasi_query';

const initialState = {
  isOpen: false,
  message: null,
  Kekurangan: null,
  isLoading: false,
  error: null,
};

const bahanBakuSlice = createSlice({
  name: 'bahanBaku',
  initialState,
  reducers: {
    showModal(state) {
      state.isOpen = true;
    },
    hideModal(state) {
      state.isOpen = false;
      state.message = null;
      state.Kekurangan = null;
      state.isLoading = false;
      state.error = null;
    },
    fetchBahanBakuStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchBahanBakuSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.Kekurangan = action.payload.Kekurangan ? action.payload.Kekurangan : null;
    },
    fetchBahanBakuFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  showModal,
  hideModal,
  fetchBahanBakuStart,
  fetchBahanBakuSuccess,
  fetchBahanBakuFailure,
} = bahanBakuSlice.actions;

export const fetchBahanBakuKurang = (id) => async (dispatch) => {
  try {
    dispatch(fetchBahanBakuStart());
    const response = await getBahanBakuKurang(id);
    dispatch(fetchBahanBakuSuccess(response));
  } catch (error) {
    dispatch(fetchBahanBakuFailure(error.message));
  }
};

export default bahanBakuSlice.reducer;