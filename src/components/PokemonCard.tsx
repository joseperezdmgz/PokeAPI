"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPokemonCardData } from "@/lib/api";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

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
      <div className="p-4 flex flex-col gap-4">
        <p className="capitalize text-black font-bold">{name}</p>
        <div className="flex gap-2 justify-between text-[13px]">
          <span className="text-black bg-yellow-400 px-2 py-1 rounded-full">
            {data.generation}
          </span>
          <span className="text-white bg-purple-600 px-2 py-1 rounded-full">
            {data.types}
          </span>
        </div>
      </div>
    </Link>
  );
}
