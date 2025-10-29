"use client";

import { redirect, useParams } from "next/navigation";
import { getPrevId } from "@/lib/quotes";
import { useSettings } from "@/store/store";

export default function PrevPage() {
  const { chosenBooks } = useSettings();
  const { id } = useParams() as { id: string };
  const prevId = getPrevId(id, chosenBooks);
  console.log("prev ID:", prevId);
  redirect(`/quote/${prevId}`);
}
