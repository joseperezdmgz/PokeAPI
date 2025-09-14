"use client";

import { useState, useEffect } from "react";
import { getGenerations } from "@/lib/api";
import { formatGenerationName } from "@/utils/format";

export default function GenerationFilter({
  generation,
  setGeneration,
}: {
  generation: string;
  setGeneration: (v: string) => void;
}) {
  const [generations, setGenerations] = useState<{ name: string }[]>([]);

  useEffect(() => {
    getGenerations().then((data) => setGenerations(data));
  }, []);
  return (
    <select
      className="p-2 border rounded bg-white dark:text-black placeholder:text-gray-500 border-gray-300 focus:outline-none capitalize"
      onChange={(e) => setGeneration(e.target.value)}
      value={generation}
    >
      <option value="">All Generations</option>
      {generations.map((generation) => (
        <option key={generation.name} value={generation.name}>
          {formatGenerationName(generation.name)}
        </option>
      ))}
    </select>
  );
}
