"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuoteById } from "@/lib/quotes";
import { useSettings } from "@/store/store";

export default function QuotePage() {
  const { id } = useParams() as { id: string };
  const { isPlaying, timeLeft, setTimeLeft, chosenBooks, isShuffle } =
    useSettings();
  const quote = getQuoteById(id, chosenBooks);
  const router = useRouter();

  useEffect(() => {
    document.title = quote ? `${quote.author} - Wise Quotes` : "Wise Quotes";
  }, [quote]);

  useEffect(() => {
    setTimeLeft(useSettings.getState().transitionTime);
  }, []);
  // If quote missing, navigate home (client-safe)
  useEffect(() => {
    if (!quote) router.replace("/");
  }, [quote, router]);

  // Navigate when timeLeft reaches 0
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      router.push(isShuffle ? "/random" : `/quote/${id}/next`);
    }
  }, [isPlaying, timeLeft, router]);

  if (!quote) return null; // brief blank while redirecting

  return (
    <div className="font-serif max-w-5xl mx-auto p-4 tracking-wider leading-relaxed text-xl">
      <h1 className="text-3xl">{quote.title}</h1>
      <blockquote className="text-2xl my-8 border-l-4 border-gray-300 pl-4 italic whitespace-pre-line">
        <p>{quote.text}</p>
      </blockquote>
      <footer className="text-right">~{quote.author}</footer>
    </div>
  );
}
