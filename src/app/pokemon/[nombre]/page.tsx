import { getPokemonCardData } from "@/lib/api";

export default async function Pokemon({
  params,
}: {
  params: { nombre: string };
}) {
  const pokemon = await getPokemonCardData(params.nombre);
  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>;
}
