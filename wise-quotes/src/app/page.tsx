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
  }, [isPlaying, timeLeft, router]);
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)]">
      <div className="text-center max-w-2xl text-zinc-300">
        <h1 className="text-3xl mb-4">Wise Quotes — Screen Saver</h1>
        <p>A new way to read</p>
      </div>
    </div>
  );
}
