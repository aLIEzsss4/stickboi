import { create } from "zustand";

export interface ZuStore {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  alertInfo: string;
  setAlertInfo: (value: string) => void;
}

const useStore = create<ZuStore>((set) => ({
  showAlert: false,
  setShowAlert: (value: boolean) => set({ showAlert: value }),
  alertInfo: "",
  setAlertInfo: (value: string) => {
    set({ alertInfo: value });
  },
}));

export default useStore;
