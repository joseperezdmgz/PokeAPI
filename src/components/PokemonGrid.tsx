"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import { getListPokemon, DEFAULT_LIMIT } from "@/lib/api";
import type { PokemonProps } from "@/lib/types";
import TypeFilter from "@/components/TypeFilter";
import GenerationFilter from "@/components/GenerationFilter";
import SearchFilter from "@/components/SearchFilter";
import { formatGenerationName } from "@/utils/format";
import ButtonScrollTop from "@/components/ButtonScrollTop";

export default function PokemonGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loaderRef = useRef<HTMLDivElement>(null);

  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(DEFAULT_LIMIT);
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
    router.replace(`/?${params.toString()}`);
    setPokemons([]);
    setOffset(0);
  }, [type, generation, search, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getListPokemon(
          offset.toString(),
          limit.toString(),
          type,
          generation,
          search
        );

        setPokemons((prev) => [...prev, ...data.results]);
        setCount(data.count);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los Pokémon. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [offset, limit, type, generation, search]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && pokemons.length < count) {
          setOffset((prev) => prev + limit);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, pokemons.length, count, limit]);

  return (
    <>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Filtros */}
      {type || generation || search ? (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {type && (
            <button
              className="bg-red-500 px-4 py-2 rounded text-white capitalize"
              onClick={() => {
                setType("");
                router.replace("/");
              }}
            >
              X {type}
            </button>
          )}
          {generation && (
            <button
              className="bg-red-500 px-4 py-2 rounded text-white"
              onClick={() => {
                setGeneration("");
                router.replace("/");
              }}
            >
              X {formatGenerationName(generation)}
            </button>
          )}
          {search && (
            <button
              className="bg-red-500 px-4 py-2 rounded text-white"
              onClick={() => {
                setSearch("");
                router.replace("/");
              }}
            >
              X {search}
            </button>
          )}
        </div>
      ) : null}

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
        {pokemons.map((p) => (
          <PokemonCard key={p.id ?? p.name} name={p.name} />
        ))}

        {loading &&
          Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-2xl animate-pulse h-72"
            />
          ))}
      </div>

      {offset >= 20 ? (
        <ButtonScrollTop
          onScrollTop={() => {
            setOffset(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : null}

      {/* Sentinel div para detectar final */}
      <div ref={loaderRef} style={{ height: 1 }} />
    </>
  );
}
