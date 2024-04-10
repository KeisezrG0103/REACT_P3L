import { create } from 'zustand';

const useKaryawanStore = create((set) => ({
  karyawan: {
  },
  setKaryawan: (data) => set((state) => ({

    karyawan: {
      ...state.karyawan, // Spread existing karyawan object
      Nama: data.Nama,   // Update Nama field
      token: data.token, // Update token field
      role: data.role    // Update role field
    },

  })
    , localStorage.setItem('karyawan', JSON.stringify(data))
  ),
  logout: () => set({ karyawan: {} })
}));



export default useKaryawanStore;
