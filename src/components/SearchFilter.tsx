"use client";
export default function SearchFilter({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Buscar Pokémon"
      className="p-2 border rounded w-full bg-white text-black placeholder:text-gray-500 border-gray-300 focus:outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
