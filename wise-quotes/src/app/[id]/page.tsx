"use client";

import { getAllIds, getQuoteById } from "@/lib/quotes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuotePage() {
  const params = useParams();
  const id = params?.id as string;
  // const [quote, setQuote] = useState<{ text: string; author: string } | null>(
  //   null
  // );

  const quote = getQuoteById(id);

  return (
    <div>
      <h1>{quote?.title}</h1>
      {quote ? (
        <blockquote>
          <p>{quote.text}</p>
          <footer>{quote.author}</footer>
        </blockquote>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
