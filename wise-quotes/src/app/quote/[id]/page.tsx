"use client";

import { getAllIds, getQuoteById } from "@/lib/quotes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuotePage() {
  const params = useParams();
  const id = params?.id as string;

  const quote = getQuoteById(id);

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
        <p>Id not fount - SHOULD REDIRECT SOMEHWEREREERERER</p>
      )}
    </div>
  );
}
