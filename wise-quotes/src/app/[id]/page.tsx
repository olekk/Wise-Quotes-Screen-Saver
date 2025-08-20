"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuotePage() {
  const params = useParams();
  const id = params?.id;
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    fetch(`/api/quotes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuote(data));
  }, [id]);

  return (
    <div>
      <h1>Quote ID: {id}</h1>
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
