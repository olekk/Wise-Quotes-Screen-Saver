import { useSettings } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Countdown from "../Countdown";
import { useParams } from "next/navigation";
import { getFirstId } from "@/lib/quotes";

const Menu: React.FC = () => {
  const {
    isPlaying,
    toggleIsPlaying: toggle,
    transitionTime: time,
    setTransitionTime: setTime,
    chosenBooks,
    setChosenBooks: setBooks,
  } = useSettings();

  // Local state for human-readable time
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Sync local state with transitionTime
  useEffect(() => {
    setHours(Math.floor(time / 3600000));
    setMinutes(Math.floor((time % 3600000) / 60000));
    setSeconds(Math.floor((time % 60000) / 1000));
  }, [time]);

  // Helper to update transitionTime in ms
  const updateTime = (h: number, m: number, s: number) => {
    const ms = Math.max(1000, h * 3600000 + m * 60000 + s * 1000);
    setTime(ms);
  };

  const { id } = useParams() as { id: string };

  return (
    <>
      <Link href="/">Intro</Link>
      <Link href="/random">Random</Link>
      <Link href={`/quote/${getFirstId(chosenBooks)}`}>First</Link>

      <Link href={`/quote/${id}/prev`}>Previous</Link>
      <Link href={`/quote/${id}/next`}>Next</Link>

      <button
        onClick={toggle}
        className="ml-auto px-2 py-1 rounded bg-white text-black"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <label className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">Transition</span>
        <input
          type="number"
          min={0}
          value={hours}
          onChange={(e) => {
            const h = Math.max(0, Number(e.target.value));
            setHours(h);
            updateTime(h, minutes, seconds);
          }}
          className="w-12 border-0 outline-0"
          placeholder="hh"
          name="hours"
        />
        <span>:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={(e) => {
            const m = Math.max(0, Math.min(59, Number(e.target.value)));
            setMinutes(m);
            updateTime(hours, m, seconds);
          }}
          className="w-12 border-0 outline-0"
          placeholder="mm"
          name="minutes"
        />
        <span>:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={seconds}
          onChange={(e) => {
            const s = Math.max(0, Math.min(59, Number(e.target.value)));
            setSeconds(s);
            updateTime(hours, minutes, s);
          }}
          className="w-12 border-0 outline-0"
          placeholder="ss"
          name="seconds"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">Countdown</span>
        <Countdown />
      </label>

      {/* simple multiselect example; replace options with your real book IDs */}
      <select
        multiple
        value={chosenBooks}
        onChange={(e) => {
          const ids = Array.from(e.target.selectedOptions).map((o) => o.value);
          setBooks(ids);
        }}
        className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded"
      >
        <option value="marcusAureliusEN">M.A. - Meditations (english)</option>
        <option value="marcusAureliusPL">M.A. - Rozmyślania (polski)</option>
      </select>
    </>
  );
};

export default Menu;
