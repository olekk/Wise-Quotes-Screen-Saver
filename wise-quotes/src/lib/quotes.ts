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
import marcusAureliusPL from "@/data/Marek-Aureliusz-Rozmyslania-PL.json";

import theSchoolOfLifeEN from "@/data/The-School-Of-Life-EN.json";
import theSchoolOfLifePL from "@/data/The-School-Of-Life-PL.json";

const collections = {
  marcusAureliusEN: marcusAureliusEN as QuotesFile,
  marcusAureliusPL: marcusAureliusPL as QuotesFile,
  theSchoolOfLifeEN: theSchoolOfLifeEN as QuotesFile,
  theSchoolOfLifePL: theSchoolOfLifePL as QuotesFile,
};

const ALL = (chosenBooks?: string[]): Quote[] =>
  chosenBooks && chosenBooks.some((id) => Object.keys(collections).includes(id))
    ? Object.entries(collections)
        .filter((ent) => chosenBooks.includes(ent[0]))
        .map((ent) => ent[1])
        .flatMap((c) =>
          c.quotes.map((q) => ({
            ...q,
            author: q.author ?? c.collection.author ?? c.collection.title,
          }))
        )
    : Object.entries(collections)
        .map((ent) => ent[1])
        .flatMap((c) =>
          c.quotes.map((q) => ({
            ...q,
            author: q.author ?? c.collection.author ?? c.collection.title,
          }))
        );

export function getAllIds(chosenBooks?: string[]) {
  return ALL(chosenBooks).map((q) => q.id);
}

export function getQuoteById(id: string, chosenBooks?: string[]) {
  return ALL(chosenBooks).find((q) => q.id === id);
}

export function getRandomId(chosenBooks?: string[]) {
  const all = ALL(chosenBooks);
  return all[Math.floor(Math.random() * all.length)]!.id;
}

export function getNextId(currentId: string, chosenBooks?: string[]) {
  const all = ALL(chosenBooks);
  const index = all.findIndex((q) => q.id === currentId);
  if (index === -1 || all.length === 0) return null;
  return all[index + 1].id;
}

export function getPrevId(currentId: string, chosenBooks?: string[]) {
  const all = ALL(chosenBooks);
  const index = all.findIndex((q) => q.id === currentId);
  if (index === -1 || all.length === 0) return null;
  return all[index - 1].id;
}

export function getFirstId(chosenBooks?: string[]) {
  const all = ALL(chosenBooks);
  return all[0].id;
}
