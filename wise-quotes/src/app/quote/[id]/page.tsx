"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuoteById } from "@/lib/quotes";
import { useSettings } from "@/store/store";

export default function QuotePage() {
  const { id } = useParams() as { id: string };
  const quote = getQuoteById(id);
  const { isPlaying, transitionTime } = useSettings();
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);

  // If quote missing, navigate home (client-safe)
  useEffect(() => {
    if (!quote) router.replace("/");
  }, [quote, router]);

  // Autoplay → /random, with proper cleanup
  useEffect(() => {
    // clear any existing timer first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!quote || !isPlaying) return;

    timeoutRef.current = window.setTimeout(() => {
      router.push("/random");
      timeoutRef.current = null;
    }, Math.max(0, transitionTime));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [quote, quote?.id, isPlaying, transitionTime, router]);

  if (!quote) return null; // brief blank while redirecting

  return (
    <div className="font-serif max-w-5xl mx-auto p-4 tracking-wider leading-relaxed text-xl">
      <h1 className="text-3xl">{quote.title}</h1>
      <blockquote className="text-2xl my-8 border-l-4 border-gray-300 pl-4 italic">
        <p>{quote.text}</p>
      </blockquote>
      <footer className="text-right">~{quote.author}</footer>
    </div>
  );
}
