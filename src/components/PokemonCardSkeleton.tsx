export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white p-2 rounded-2xl shadow flex flex-col animate-pulse">
      {/* Imagen */}
      <div className="bg-gray-400 flex justify-center items-center relative rounded-2xl overflow-hidden h-64">
        <span className="absolute top-2 right-2 h-4 w-10 bg-gray-500 rounded" />
      </div>

      {/* Texto */}
      <div className="py-4 px-2 flex flex-col gap-4">
        <div className="h-4 w-24 bg-gray-400 rounded" />

        {/* Tags */}
        <div className="flex gap-2 text-xs">
          <div className="h-4 w-20 bg-gray-400 rounded-full" />
          <div className="h-4 w-20 bg-gray-400 rounded-full" />
        </div>
      </div>
      <span className="text-black font-bold w-2/5 mx-auto h-1 bg-gray-300 rounded-full" />
    </div>
  );
}
