import { PokemonCardProps } from "@/lib/types";
import { typeColors } from "@/lib/translation";

const API_URL = process.env.API_URL;
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;

export async function getListPokemon(
  offset: string = DEFAULT_OFFSET.toString(),
  limit: string = DEFAULT_LIMIT.toString(),
  type?: string,
  generation?: string,
  search?: string
) {
  let allPokemon: any[] = [];

  const resAll = await fetch(`${API_URL}pokemon?limit=100000`);
  const dataAll = await resAll.json();
  allPokemon = dataAll.results;

  if (type) {
    const resType = await fetch(`${API_URL}type/${type}`);
    const dataType = await resType.json();
    const pokemonOfType = dataType.pokemon.map((p: any) => p.pokemon.name);
    allPokemon = allPokemon.filter((p) => pokemonOfType.includes(p.name));
  }

  if (generation) {
    const resGen = await fetch(`${API_URL}generation/${generation}`);
    const dataGen = await resGen.json();
    const pokemonOfGen = dataGen.pokemon_species.map((p: any) => p.name);
    allPokemon = allPokemon.filter((p) => pokemonOfGen.includes(p.name));
  }

  if (search) {
    allPokemon = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = Number(offset);
  const end = start + Number(limit);
  const paginatedPokemon = allPokemon.slice(start, end);

  const detailedResults = await Promise.all(
    paginatedPokemon.map(async (pokemon: { name: string; url: string }) => {
      const resPokemon = await fetch(pokemon.url);
      const pokeData = await resPokemon.json();

      const resSpecies = await fetch(pokeData.species.url);
      const species = await resSpecies.json();

      const sprite =
        pokeData.sprites.other["official-artwork"].front_default ||
        pokeData.sprites.front_default;

      const bgClass = `bg-${pokeData.types[0].type.name}-500`;

      return {
        id: pokeData.id,
        name: pokeData.name,
        sprite,
        types: pokeData.types,
        generation: species.generation.name,
        bgClass,
      };
    })
  );

  return {
    results: detailedResults,
    count: allPokemon.length,
  };
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
