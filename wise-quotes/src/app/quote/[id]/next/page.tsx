"use client";

import { redirect, useParams } from "next/navigation";
import { getNextId } from "@/lib/quotes";
import { useSettings } from "@/store/store";

export default function NextPage() {
  const { chosenBooks } = useSettings();
  const { id } = useParams() as { id: string };
  const nextId = getNextId(id, chosenBooks);
  console.log("Next ID:", nextId);
  redirect(`/quote/${nextId}`);
}
