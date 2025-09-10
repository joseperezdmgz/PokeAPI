import { PokemonCardProps } from "@/lib/types";
import { typeColors, typeMap, generationMap } from "@/lib/translation";

const url = process.env.API_URL;

export async function getListPokemon() {
  const res = await fetch(`${url}pokemon`);
  const data = await res.json();

  return data.results;
}

export async function getPokemonCardData(
  name: string,
): Promise<PokemonCardProps> {
  const res = await fetch(`${url}pokemon/${name}`);
  const pokemon = await res.json();

  const types = pokemon.types.map((t: any) => typeMap[t.type.name]).join(", ");
  const sprite = pokemon.sprites.other.dream_world.front_default;

  const speciesRes = await fetch(`${url}pokemon-species/${name}`);
  const species = await speciesRes.json();
  const generation = generationMap[species.generation.name];
  const bgClass = typeColors[pokemon.types[0].type.name] || typeColors.normal;

  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite,
    types,
    generation,
    bgClass,
  };
}
