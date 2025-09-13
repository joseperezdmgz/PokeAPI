"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchFilter({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);
  
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <input
      type="text"
      placeholder="Buscar Pokémon"
      className="p-2 border rounded w-full bg-white text-black placeholder:text-gray-500 border-gray-300 focus:outline-none"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
