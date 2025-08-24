import { redirect } from "next/navigation";
import { getRandomId } from "@/lib/quotes";

export default function RandomPage() {
  const id = getRandomId();
  redirect(`/quote/${id}`);
}
