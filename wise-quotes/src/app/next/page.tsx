"use client";

import { redirect } from "next/navigation";
import { getNextId } from "@/lib/quotes";
import { useSettings } from "@/store/store";

export default function RandomPage() {
  const { chosenBooks } = useSettings();
  const currentId = ""; // Placeholder, implement logic to get current quote ID if needed
  const id = getNextId(currentId, chosenBooks);
  redirect(`/quote/${id}`);
}
