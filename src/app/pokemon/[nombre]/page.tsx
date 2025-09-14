import { getPokemonViewData } from "@/lib/api";
import ButtonBack from "@/components/ButtonBack";
import PokemonStats from "@/components/PokemonStats";
import Link from "next/link";

export default async function Pokemon({
  params,
}: {
  params: Promise<{ nombre: string }>;
}) {
  const pokemon = await getPokemonViewData((await params).nombre);
  return (
    <article className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full border rounded-2xl px-4 py-2">
        <ButtonBack />
        <h1 className="text-2xl font-bold capitalize">
          {pokemon.name} #{pokemon.id.toString().padStart(3, "0")}
        </h1>
      </div>

      <div className="border rounded-2xl px-4 py-2">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <h2 className="text-lg font-bold capitalize text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </h2>
        </div>
        <ul className="flex gap-4 items-center justify-center flex-col md:flex-row">
          <li className="md:w-1/2 p-4 flex items-center justify-center">
            <img src={pokemon.sprite} alt={pokemon.name} className="" />
          </li>
          <PokemonStats stats={pokemon.stats} bgClass={pokemon.bgClass} />
        </ul>
      </div>
      <div className="border rounded-2xl px-4 py-2">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold capitalize">Evolution Chain</h2>
        </div>
        <ul className="flex gap-10 items-center justify-center flex-col md:flex-row">
          {pokemon.evolutions.map((evolution) => (
            <Link
              href={`/pokemon/${evolution.name}`}
              key={evolution.name}
              className="md:w-1/2 p-4 flex flex-col items-center justify-center "
            >
              <li
                className={`p-4 flex flex-col items-center justify-center  ${
                  pokemon.name === evolution.name
                    ? " border-2 border-yellow-500 rounded-2xl"
                    : ""
                }`}
              >
                <img
                  src={evolution.sprite}
                  alt={evolution.name}
                  className="w-2/3"
                />
                <h2 className="text-lg font-bold capitalize">
                  {evolution.name}
                </h2>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </article>
  );
}
