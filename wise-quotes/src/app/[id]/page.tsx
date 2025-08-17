"use client";

import { useParams } from "next/navigation";

export default function QuotePage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div>
      <h1>Quote ID: {id}</h1>
      {/* Additional content can be added here */}
    </div>
  );
}
