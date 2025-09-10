import { PokemonCardProps } from "@/lib/types";
import { typeColors, typeMap, generationMap } from "@/lib/translation";

const API_URL = process.env.API_URL;

export async function getListPokemon(
  url?: string,
  offset?: number,
  limit?: number
) {
  const res = await fetch(
    `${url || API_URL}pokemon?offset=${offset || 0}&limit=${limit || 20}`
  );
  const data = await res.json();

  return data;
}

export async function getPokemonCardData(
  name: string
): Promise<PokemonCardProps> {
  const res = await fetch(`${API_URL}pokemon/${name}`);
  const pokemon = await res.json();

  const types = pokemon.types.map((t: any) => typeMap[t.type.name]).join(", ");
  const sprite = pokemon.sprites.other.dream_world.front_default;

  const speciesRes = await fetch(`${API_URL}pokemon-species/${name}`);
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
