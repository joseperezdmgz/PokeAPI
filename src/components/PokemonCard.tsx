"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPokemonCardData } from "@/lib/api";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { typeColors } from "@/lib/translation";
import type { PokemonCardProps } from "@/lib/types";
import { formatGenerationName } from "@/utils/format";

export default function PokemonCard({ name }: { name: string }) {
  const [data, setData] = useState<PokemonCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPokemonCardData(name);
        setData(result);
      } catch (err: unknown) {
        console.error("Error fetching Pokémon card data:", err);
        setError("No se pudo cargar este Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) return <PokemonCardSkeleton />;
  if (error) return <div>{error}</div>;
  if (!data)
    return (
      <div className="text-center text-white">No se encontró el Pokémon.</div>
    );

  return (
    <Link
      href={`/pokemon/${name}`}
      className="bg-white p-2 rounded-2xl shadow flex flex-col group"
    >
      <div
        className={`${data.bgClass} flex justify-center items-center relative rounded-2xl overflow-hidden group-hover:overflow-visible transition-transform`}
      >
        <img
          src={data.sprite}
          alt={name}
          className="w-full h-64 group-hover:scale-120 transition-transform group-hover:z-10"
        />
        <span className="absolute top-2 right-2 text-white border p-1 text-xs rounded">
          #{data.id.toString().padStart(3, "0")}
        </span>
        <span className="absolute bottom-2 right-2 text-white border-black p-1 text-xs rounded opacity-100 bg-black/50 backdrop-blur-lg shadow">
          {formatGenerationName(data.generation)}
        </span>
      </div>
      <div className="py-4 px-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="capitalize text-black font-bold">{name}</p>
        </div>
        <div className="flex gap-2 text-xs">
          {data.types.map((type) => (
            <span
              key={type.type.name}
              className={`${
                typeColors[type.type.name]
              } px-2 py-1 rounded-full capitalize text-white`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      <span className="text-black font-bold w-2/5 mx-auto h-1 bg-gray-300 rounded-full" />
    </Link>
  );
}
getPokemonCardData;
