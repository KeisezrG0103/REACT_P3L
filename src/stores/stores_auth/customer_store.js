import { create } from 'zustand';

const useCustomerStore = create((set) => ({
    customer: {
    },
    setCustomer: (data) => set((state) => ({
        customer: {
            ...state.customer, // Spread existing customer object
            Email: data.Email,   // Update Nama field
            token: data.token, // Update token field
            Nama: data.Nama   // Update role field
        }
    })),
    logout: () => set({ customer: {} })
}));


export default useCustomerStore;