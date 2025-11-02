import { useSettings } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Countdown from "../Countdown";
import { useParams } from "next/navigation";
import { getFirstId } from "@/lib/quotes";

// MUI imports
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";

const Menu: React.FC = () => {
  const {
    isPlaying,
    toggleIsPlaying,
    isShuffle,
    toggleIsShuffle,
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
      <Link href="/">HOME</Link>

      <Link href={`/quote/${getFirstId(chosenBooks)}`}>Show First Quote</Link>
      <Link href="/random">Show Random Quote</Link>

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
      <Box
        sx={{ "& svg": { fontSize: 45 } }}
        className="mb-5 mt-10 justify-between flex items-center"
      >
        <Link href={`/quote/${id}/prev`} title="Show Previous Quote">
          <ArrowBackIcon />
        </Link>

        <button
          onClick={toggleIsPlaying}
          className="px-2 py-1 rounded bg-white text-black cursor-pointer"
          title="Toggle Play/Pause"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <button
          onClick={toggleIsShuffle}
          className="cursor-pointer"
          title="Toggle Shuffle"
        >
          {isShuffle ? (
            <div style={{ position: "relative" }}>
              <ShuffleIcon />
              <CircleIcon
                sx={{
                  transform: "scale(.15)",
                  position: "absolute",
                  bottom: -22,
                  left: 0,
                }}
              />
            </div>
          ) : (
            <ShuffleIcon sx={{ color: "grey" }} />
          )}
        </button>

        <Link href={`/quote/${id}/next`} title="Show Next Quote">
          <ArrowForwardIcon />
        </Link>
      </Box>

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
          style={{ fontSize: "2rem" }}
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
          style={{ fontSize: "2rem" }}
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
          style={{ fontSize: "2rem" }}
        />
      </label>

      <Box sx={{ fontSize: 30 }}>
        <span className="text-xs text-zinc-400">Countdown</span> <br />
        <Countdown />
        {/* to add increment, decrement buttons later and remove the number inputs */}
      </Box>
    </>
  );
};

export default Menu;
