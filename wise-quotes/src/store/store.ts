"use client";

import { create } from "zustand";

type SettingsState = {
  isPlaying: boolean;
  transitionTime: number; // ms
  chosenBooks: string[]; // e.g. ['ma', 'sol']

  setIsPlaying: (v: boolean) => void;
  toggleIsPlaying: () => void;
  setTransitionTime: (ms: number) => void;
  setChosenBooks: (ids: string[]) => void;
};

export const useSettings = create<SettingsState>((set) => ({
  isPlaying: true,
  transitionTime: 10_000,
  chosenBooks: [],

  setIsPlaying: (v) => set({ isPlaying: v }),
  toggleIsPlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setTransitionTime: (ms) => set({ transitionTime: Math.max(1000, ms) }),
  setChosenBooks: (ids) => set({ chosenBooks: Array.from(new Set(ids)) }),
}));
