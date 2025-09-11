import { Suspense } from "react";
import PokemonGrid from "@/components/PokemonGrid";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<p className="text-white">Cargando pokemons...</p>}>
        <PokemonGrid />
      </Suspense>
    </>
  );
}
