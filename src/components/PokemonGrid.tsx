"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import { getListPokemon } from "@/lib/api";
import Pagination from "@/components/Pagination";
import { DEFAULT_LIMIT } from "@/lib/api";

export default function PokemonGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
  const offset = Number(searchParams.get("offset"));

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const fetchPage = async (newOffset: number) => {
    const data = await getListPokemon(undefined, newOffset, limit);
    setPokemons(data.results);
    setCount(data.count);

    router.push(`/?offset=${newOffset}&limit=${limit}`);
  };

  useEffect(() => {
    fetchPage(offset);
  }, [offset, limit]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>
      <Pagination
        hasPrev={offset > 0}
        hasNext={offset + limit < count}
        onPrev={() => fetchPage(offset - limit)}
        onNext={() => fetchPage(offset + limit)}
      />
    </>
  );
}
