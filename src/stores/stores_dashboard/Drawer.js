import { create } from "zustand";

export const useDrawerStore = create((set) => ({
    open: false,
    openDrawer: () => set({ open: true }),
    closeDrawer: () => set({ open: false }),
}));