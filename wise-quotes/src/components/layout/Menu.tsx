import { useSettings } from "@/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import Countdown from "../Countdown";

// interface MenuProps {
//   children?: ReactNode;
//   className?: string;
// }

const Menu: React.FC = () => {
  const {
    isPlaying,
    toggleIsPlaying: toggle,
    transitionTime: time,
    setTransitionTime: setTime,
    chosenBooks: chosen,
    setChosenBooks: setBooks,
  } = useSettings();

  return (
    <>
      <Link href="/">Intro</Link>
      <Link href="/random">Random</Link>
      <Link href="/quote/Marcus-Aurelius-Meditations-0101">First</Link>

      <button
        onClick={toggle}
        className="ml-auto px-2 py-1 rounded bg-white text-black"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <label className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">Transition (ms)</span>
        <input
          type="number"
          min={1000}
          value={time}
          onChange={(e) => setTime(Number(e.target.value) || 1000)}
          className="w-28 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">Countdown</span>
        <Countdown />
      </label>

      {/* simple multiselect example; replace options with your real book IDs */}
      <select
        multiple
        value={chosen}
        onChange={(e) => {
          const ids = Array.from(e.target.selectedOptions).map((o) => o.value);
          setBooks(ids);
        }}
        className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded"
      >
        <option value="ma">Marcus Aurelius</option>
        <option value="sol">School of Life</option>
      </select>
    </>
  );
};

export default Menu;
