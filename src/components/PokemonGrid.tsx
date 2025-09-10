import PokemonCard from "@/components/PokemonCard";
import { getListPokemon } from "@/lib/api";
import { PokemonProps } from "@/lib/types";

export default async function PokemonGrid() {
  const data = await getListPokemon();

  const indexData: PokemonProps[] = data.map((p: any) => {
    const parts = p.url.split("/").filter(Boolean);
    return { id: +parts[parts.length - 1], name: p.name, url: p.url };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {indexData.map((p) => (
        <PokemonCard key={p.id} name={p.name} />
      ))}
    </div>
  );
}
