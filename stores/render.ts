import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ElementMeta } from "./controller";

interface RenderState {
  templateHeight: number;
  templateWidth: number;
  imageUrl: string;
  focused: boolean;
  elements: ElementMeta[];
  mutate: (payload: Partial<RenderState>) => void;
}

const useRender = create<RenderState>()(
  devtools((set) => ({
    imageUrl: "/images/template.svg",
    templateHeight: 325,
    templateWidth: 800,
    focused: false,
    elements: [],
    mutate: (payload) => set({ ...payload }),
  }))
);

export default useRender;
