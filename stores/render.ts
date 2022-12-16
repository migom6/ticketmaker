import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ElementMeta } from "./controller";

interface RenderState {
  imageUrl: string;
  focused: boolean;
  elements: ElementMeta[];
  mutate: (payload: Partial<RenderState>) => void;
}

const useRender = create<RenderState>()(
  devtools((set) => ({
    imageUrl: "/images/template.svg",
    focused: false,
    elements: [],
    mutate: (payload) => set({ ...payload }),
  }))
);

export default useRender;
