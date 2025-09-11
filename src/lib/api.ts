import { PokemonCardProps } from "@/lib/types";
import { typeColors } from "@/lib/translation";
import { types } from "util";

const API_URL = process.env.API_URL;
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;

export async function getListPokemon(
  url?: string,
  offset?: number,
  limit?: number
) {
  const res = await fetch(
    `${url || API_URL}pokemon?offset=${offset || DEFAULT_OFFSET}&limit=${
      limit || DEFAULT_LIMIT
    }`
  );
  const data = await res.json();

  return data;
}

export async function getPokemonCardData(
  name: string
): Promise<PokemonCardProps> {
  const res = await fetch(`${API_URL}pokemon/${name}`);
  const pokemon = await res.json();

  const sprite =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.front_default;

  const speciesRes = await fetch(`${API_URL}pokemon-species/${pokemon.id}`);
  const species = await speciesRes.json();

  const generation = species.generation.name;
  const bgClass = typeColors[pokemon.types[0].type.name] || typeColors.normal;

  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite,
    types: pokemon.types,
    generation,
    bgClass,
  };
}
