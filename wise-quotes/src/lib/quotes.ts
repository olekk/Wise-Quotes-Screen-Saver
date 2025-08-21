export type Quote = {
  id: string;
  title: string;
  text: string;
  author?: string;
};
export type QuotesFile = {
  collection: { title: string; author?: string };
  quotes: Quote[];
};

// Import each JSON you want included:
import marcusAureliusEN from "@/data/Marcus-Aurelius-Meditations-EN.json";
import theSchoolOfLifeEN from "@/data/The-School-Of-Life-EN.json";

const collections = [
  marcusAureliusEN as QuotesFile,
  theSchoolOfLifeEN as QuotesFile,
];

const ALL: Quote[] = collections.flatMap((c) =>
  c.quotes.map((q) => ({
    ...q,
    author: q.author ?? c.collection.author ?? c.collection.title,
  }))
);

export function getAllIds() {
  return ALL.map((q) => q.id);
}
export function getQuoteById(id: string) {
  return ALL.find((q) => q.id === id);
}
export function getRandomId() {
  return ALL[Math.floor(Math.random() * ALL.length)]!.id;
}
