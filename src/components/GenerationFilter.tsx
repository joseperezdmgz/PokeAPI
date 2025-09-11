"use client";

import { useState, useEffect } from "react";
import { getGenerations } from "@/lib/api";
import { formatGenerationName } from "@/utils/format";

export default function GenerationFilter() {
  const [generations, setGenerations] = useState<{ name: string }[]>([]);

  useEffect(() => {
    getGenerations().then((data) => setGenerations(data));
  }, []);
  return (
    <select className="p-2 border rounded bg-white text-black placeholder:text-gray-500 border-gray-300 focus:outline-none capitalize">
      <option value="">All Generations</option>
      {generations.map((generation) => (
        <option key={generation.name} value={generation.name}>
          {formatGenerationName(generation.name)}
        </option>
      ))}
    </select>
  );
}
