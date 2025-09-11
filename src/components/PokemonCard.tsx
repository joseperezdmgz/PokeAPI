"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPokemonCardData } from "@/lib/api";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { typeColors } from "@/lib/translation";

export default function PokemonCard({ name }: { name: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getPokemonCardData(name).then((data) => {
      setData(data);
    });
  }, [name]);

  if (!data) return <PokemonCardSkeleton />;

  return (
    <Link
      href={`/pokemon/${name}`}
      className="bg-white p-2 rounded-2xl shadow flex flex-col"
    >
      <div
        className={`${data.bgClass} flex justify-center items-center relative rounded-2xl overflow-hidden`}
      >
        <img src={data.sprite} alt={name} className="w-full h-64" />
        <span className="absolute top-2 right-2 text-white">#{data.id}</span>
      </div>
      <div className="py-4 px-1 flex flex-col gap-4">
        <p className="capitalize text-black font-bold">{name}</p>
        <div className="flex gap-2 text-xs">
          {data.types.map((type: any) => (
            <span
              key={type.type.name}
              className={`${typeColors[type.type.name]} px-2 py-1 rounded-full capitalize`}
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
