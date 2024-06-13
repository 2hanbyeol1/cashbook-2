import { create } from "zustand";

const useLoginStore = create((set) => ({
  loginUser: null,
  login: (user) => set({ loginUser: user }),
  logout: () => set({ loginUser: null }),
}));

export default useLoginStore;
