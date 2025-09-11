import { PokemonCardProps } from "@/lib/types";
import { typeColors } from "@/lib/translation";

const API_URL = process.env.API_URL;
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;

export async function getListPokemon(
  url?: string,
  offset?: string,
  limit?: string,
  type?: string,
  generation?: string,
  search?: string
) {
  const res = await fetch(
    `${url || API_URL}pokemon?offset=${offset || DEFAULT_OFFSET}&limit=${
      limit || DEFAULT_LIMIT
    }
    ${type ? `&type=${type}` : ""}
    ${generation ? `&generation=${generation}` : ""}
    ${search ? `&search=${search}` : ""}`
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
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.other.home.front_default ||
    pokemon.sprites.front_default;

  const speciesRes = await fetch(pokemon.species.url);
  const species = await speciesRes.json();

  const bgClass = typeColors[pokemon.types[0].type.name] || typeColors.normal;

  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite,
    types: pokemon.types,
    generation: species.generation.name,
    bgClass: bgClass,
  };
}

export async function getTypes(name?: string) {
  const res = await fetch(
    `${API_URL}type?${name ? `/${name}` : "/?limit=100"}`
  );
  const data = await res.json();
  return data.results;
}

export async function getGenerations(name?: string) {
  const res = await fetch(
    `${API_URL}generation?${name ? `/${name}` : "/?limit=100"}`
  );
  const data = await res.json();
  return data.results;
}
