import { create } from "zustand";

type DataState = {
  brightness: number;
  contrast: number;
  setBrightness: (val: number) => void;
  setContrast: (val: number) => void;
};

export const useDataStore = create<DataState>((set) => ({
  brightness: 1,
  contrast: 1,
  setBrightness: (val) => set({ brightness: val }),
  setContrast: (val) => set({ contrast: val }),
}));
