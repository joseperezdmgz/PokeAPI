import { Suspense } from "react";
import PokemonGrid from "@/components/PokemonGrid";

export default function HomePage() {
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <p className="text-white">Filtros</p>
      </div>

      <Suspense fallback={<p className="text-white">Cargando pokemons...</p>}>
        <PokemonGrid />
      </Suspense>
    </div>
  );
}
