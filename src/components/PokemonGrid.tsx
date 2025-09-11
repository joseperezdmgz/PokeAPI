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

  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit")) || DEFAULT_LIMIT
  );
  const [offset, setOffset] = useState<number>(
    Number(searchParams.get("offset")) || DEFAULT_OFFSET
  );
  const [type, setType] = useState<string>(searchParams.get("type") || "");
  const [generation, setGeneration] = useState<string>(
    searchParams.get("generation") || ""
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (type) params.set("type", type);
    if (generation) params.set("generation", generation);
    if (search) params.set("search", search);

    params.set("offset", offset.toString());
    params.set("limit", limit.toString());

    router.replace(`/?${params.toString()}`);
  }, [type, generation, search, offset, limit, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getListPokemon(
          "",
          offset.toString(),
          limit.toString(),
          type,
          generation,
          search
        );

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
  }, [offset, limit, type, generation, search]);

  const fetchPage = (newOffset: string) => {
    setOffset(Math.max(Number(newOffset), 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <TypeFilter type={type} setType={setType} />
        <SearchFilter search={search} setSearch={setSearch} />
        <GenerationFilter
          generation={generation}
          setGeneration={setGeneration}
        />
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
          count={count}
          onPrev={() => fetchPage((Number(offset) - Number(limit)).toString())}
          onNext={() => fetchPage((Number(offset) + Number(limit)).toString())}
          limit={limit}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={setOffset}
        />
      )}
    </>
  );
}
