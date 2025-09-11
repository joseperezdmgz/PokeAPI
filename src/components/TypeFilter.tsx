"use client";

import { useState, useEffect } from "react";
import { getTypes } from "@/lib/api";
import { typeColors } from "@/lib/translation";

export default function TypeFilter() {
  const [types, setTypes] = useState<{ name: string }[]>([]);

  useEffect(() => {
    getTypes().then((data) => setTypes(data));
  }, []);

  return (
    <select className="p-2 border rounded bg-white text-black placeholder:text-gray-500 border-gray-300 focus:outline-none capitalize">
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}
