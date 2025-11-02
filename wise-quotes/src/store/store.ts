"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SettingsState = {
  isPlaying: boolean;
  isShuffle: boolean;
  toggleIsShuffle: () => void;
  transitionTime: number; // ms
  chosenBooks: string[]; // e.g. ['ma', 'sol']
  timeLeft: number; // ms
  setIsPlaying: (v: boolean) => void;
  toggleIsPlaying: () => void;
  setTransitionTime: (ms: number) => void;
  setChosenBooks: (ids: string[]) => void;
  setTimeLeft: (ms: number) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      isPlaying: true,
      isShuffle: true,
      toggleIsShuffle: () => set({ isShuffle: !get().isShuffle }),
      chosenBooks: [],

      transitionTime: 10_000,
      timeLeft: 10_000,
      setIsPlaying: (v) => set({ isPlaying: v }),
      toggleIsPlaying: () => set({ isPlaying: !get().isPlaying }),
      setTransitionTime: (ms) =>
        set({
          transitionTime: Math.max(1000, ms),
          timeLeft: Math.max(1000, ms),
        }),
      setTimeLeft: (ms) => set({ timeLeft: ms }),
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
