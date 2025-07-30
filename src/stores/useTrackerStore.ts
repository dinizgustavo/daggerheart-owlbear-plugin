// stores/useTrackerStore.ts
import { create } from "zustand";

type Mode = "PLAYER" | "DM";

interface TrackerState {
  mode: Mode;
  setMode: (mode: Mode) => void;

  hope: number;
  fear: number;
  addHope: () => void;
  removeHope: () => void;
  addFear: () => void;
  removeFear: () => void;
}

export const useTrackerStore = create<TrackerState>((set) => ({
  mode: "PLAYER",
  setMode: (mode) => set({ mode }),

  hope: 0,
  fear: 0,
  addHope: () => set((state) => ({ hope: Math.min(state.hope + 1, 10) })),
  removeHope: () => set((state) => ({ hope: Math.max(state.hope - 1, 0) })),
  addFear: () => set((state) => ({ fear: Math.min(state.fear + 1, 10) })),
  removeFear: () => set((state) => ({ fear: Math.max(state.fear - 1, 0) })),
}));
