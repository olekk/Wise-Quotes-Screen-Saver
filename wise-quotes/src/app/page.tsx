"use client";

import { getFirstId } from "@/lib/quotes";
import { useSettings } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Intro() {
  const { isPlaying, timeLeft, isShuffle, chosenBooks } = useSettings();
  const router = useRouter();
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      router.push(isShuffle ? "/random" : `/quote/${getFirstId(chosenBooks)}`);
    }
  }, [isPlaying, timeLeft, router, isShuffle, chosenBooks]);
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)]">
      <div className="text-center max-w-2xl text-zinc-300">
        <h1 className="text-3xl mb-4">Quality Texts - Slideshow</h1>
        <p>
          Relax and contemplate the texts I gathered here. <br />
          Just leave it on the screen and think about it. <br />
          No need to rush or read them all.
        </p>
      </div>
    </div>
  );
}
