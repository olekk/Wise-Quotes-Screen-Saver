"use client";

import { getQuoteById } from "@/lib/quotes";
import { redirect, useParams, useRouter } from "next/navigation";

export default function QuotePage() {
  const params = useParams();
  const id = params?.id as string;

  const quote = getQuoteById(id);

  const router = useRouter();
  setTimeout(() => {
    router.push("/random");
  }, 10000);

  return (
    <div className="font-serif max-w-5xl mx-auto p-4 tracking-wider leading-relaxed text-xl">
      <h1 className="text-3xl">{quote?.title}</h1>
      {quote ? (
        <>
          <blockquote className="text-2xl my-8 border-l-4 border-gray-300 pl-4 italic">
            <p>{quote.text}</p>
          </blockquote>
          <footer className="text-right">~{quote.author}</footer>
        </>
      ) : (
        redirect(`/`)
      )}
    </div>
  );
}
