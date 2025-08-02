// stores/useTrackerStore.ts
import { create } from "zustand";

type Mode = "PLAYER" | "DM";

interface TrackerState {
  mode: Mode;
  setMode: (mode: Mode) => void;

  hope: number;
  fear: number;
  stress: number;

  setHope: (value: number) => void;
  setFear: (value: number) => void;
  setStress: (value: number) => void;
}

export const useTrackerStore = create<TrackerState>((set) => ({
  mode: "PLAYER",
  setMode: (mode) => set({ mode }),

  hope: 0,
  fear: 0,
  stress: 0,

  setHope: (value) => set({ hope: value }),
  setFear: (value) => set({ fear: value }),
  setStress: (value) => set({ stress: value }),
}));
