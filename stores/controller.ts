import { CSSProperties } from "react";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ElementMeta {
  id: string;
  value: string;
  posX: number;
  posY: number;
  fontSize: number;
  style: CSSProperties;
}

interface ControllerState extends Omit<ElementMeta, "id"> {
  mutate: (payload: Partial<ControllerState>) => void;
  reset: () => void;
}

const useController = create<ControllerState>()(
  devtools((set) => ({
    value: "",
    posX: 0,
    posY: 0,
    font: "",
    style: {},
    fontSize: 14,
    mutate: (payload) => set({ ...payload }),
    reset: () => set({ value: "", posX: 0, posY: 0, fontSize: 14 }),
  }))
);

export default useController;
