import { useSettings } from "@/store/store";
import Link from "next/link";
import React from "react";
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
    chosenBooks,
    setChosenBooks: setBooks,
  } = useSettings();

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
        <option value="theSchoolOfLifeEN">The School Of Life (english)</option>
        <option value="theSchoolOfLifePL">The School Of Life (polski)</option>
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
        >
          {isPlaying ? (
            <span title="Pause Slideshow">
              <PauseIcon />
            </span>
          ) : (
            <span title="Play Slideshow">
              <PlayArrowIcon />
            </span>
          )}
        </button>
        <button onClick={toggleIsShuffle} className="cursor-pointer">
          {isShuffle ? (
            <div style={{ position: "relative" }} title="Shuffle On">
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
            <span title="Shuffle Off">
              <ShuffleIcon sx={{ color: "grey" }} />
            </span>
          )}
        </button>

        <Link href={`/quote/${id}/next`} title="Show Next Quote">
          <ArrowForwardIcon />
        </Link>
      </Box>

      <Box sx={{ fontSize: 30 }}>
        <span className="text-xs text-zinc-400">Countdown</span> <br />
        <Countdown />
      </Box>
    </>
  );
};

export default Menu;
