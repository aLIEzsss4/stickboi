import { create } from "zustand";

export interface ZuStore {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  alertInfo: string;
  setAlertInfo: (value: string) => void;
  enableBtn: boolean;
  setEnableBtn: (value: boolean) => void;
}

const useAppStore = create<ZuStore>((set) => ({
  showAlert: false,
  setShowAlert: (value: boolean) => set({ showAlert: value }),
  alertInfo: "",
  setAlertInfo: (value: string) => {
    set({ alertInfo: value });
  },
  enableBtn: true,
  setEnableBtn: (value: boolean) => {
    set({ enableBtn: value });
  },
}));

export default useAppStore;
