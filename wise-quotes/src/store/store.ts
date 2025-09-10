"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SettingsState = {
  isPlaying: boolean;
  transitionTime: number; // ms
  chosenBooks: string[]; // e.g. ['ma', 'sol']

  setIsPlaying: (v: boolean) => void;
  toggleIsPlaying: () => void;
  setTransitionTime: (ms: number) => void;
  setChosenBooks: (ids: string[]) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      isPlaying: true,
      transitionTime: 10_000,
      chosenBooks: [],
      setIsPlaying: (v) => set({ isPlaying: v }),
      toggleIsPlaying: () => set({ isPlaying: !get().isPlaying }),
      setTransitionTime: (ms) => set({ transitionTime: Math.max(1000, ms) }),
      setChosenBooks: (ids) => set({ chosenBooks: Array.from(new Set(ids)) }),
    }),
    {
      name: "wq-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        isPlaying: s.isPlaying,
        transitionTime: s.transitionTime,
        chosenBooks: s.chosenBooks,
      }),
    }
  )
);
