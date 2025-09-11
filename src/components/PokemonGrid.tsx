"use client";

import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import { getListPokemon } from "@/lib/api";
import Pagination from "@/components/Pagination";

export default function PokemonGrid() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const fetchPage = async (url?: string | null) => {
    const data = await getListPokemon(url || undefined);
    setPokemons(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>
      <Pagination
        hasPrev={!!prevUrl}
        hasNext={!!nextUrl}
        onPrev={() => fetchPage(prevUrl)}
        onNext={() => fetchPage(nextUrl)}
      />
    </>
  );
}
