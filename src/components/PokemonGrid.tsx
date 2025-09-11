"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import { getListPokemon } from "@/lib/api";
import Pagination from "@/components/Pagination";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "@/lib/api";
import type { PokemonProps } from "@/lib/types";
import TypeFilter from "@/components/TypeFilter";
import GenerationFilter from "@/components/GenerationFilter";
import SearchFilter from "@/components/SearchFilter";

export default function PokemonGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
  const offset = Number(searchParams.get("offset")) || DEFAULT_OFFSET;

  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = (newOffset: number) => {
    const safeOffset = Math.max(newOffset, 0);
    router.push(`/?offset=${safeOffset}&limit=${limit}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getListPokemon(undefined, offset, limit);
        setPokemons(data.results);
        setCount(data.count);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
        setError("No se pudieron cargar los Pokémon. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [offset, limit]);

  return (
    <>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <TypeFilter />
        <SearchFilter />
        <GenerationFilter />
      </div>

      {/* Grid de Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded-2xl animate-pulse h-72"
              />
            ))
          : pokemons.map((p) => (
              <PokemonCard key={p.id ?? p.name} name={p.name} />
            ))}
      </div>

      {/* Paginación */}
      {!loading && pokemons.length > 0 && (
        <Pagination
          hasPrev={offset > 0}
          hasNext={offset + limit < count}
          onPrev={() => fetchPage(offset - limit)}
          onNext={() => fetchPage(offset + limit)}
          limit={limit}
          offset={offset}
          router={router}
        />
      )}
    </>
  );
}
