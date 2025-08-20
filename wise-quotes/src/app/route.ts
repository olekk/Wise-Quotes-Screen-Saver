import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const booksJsonsNames = {
    marcusAurelius: "Marcus-Aurelius-Meditations.json",
    bible: "Bible",
    schoolOfLife: "The School of Life",
    courseOnMiracles: "A Course on Miracles",
    myOwn: "My Own",
    other: "Other",
  };
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    booksJsonsNames.marcusAurelius
  );
  const fileData = await fs.readFile(filePath, "utf-8");
  const quotes = JSON.parse(fileData);

  const quote = quotes.quotes.find((q: { id: string }) => q.id === params.id);

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}
