const MAX_STAT_VALUE = 255;

export default function PokemonStats({
  stats,
  bgClass,
}: {
  stats: any;
  bgClass: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:w-1/2 py-4">
      <h2 className="text-2xl font-bold capitalize text-center">Base Stats</h2>
      {stats.map((stat: any) => (
        <div
          key={stat.stat.name}
          className="flex flex-col md:flex-row gap-4 items-center justify-end"
        >
          <p className="text-xl font-bold capitalize">{stat.stat.name}</p>
          <div className="bg-gray-200 h-2.5 w-full md:w-1/2">
            <div
              className={`h-2.5 ${bgClass}`}
              style={{
                width: `${(stat.base_stat / MAX_STAT_VALUE) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-xl font-bold capitalize text-nowrap">
            {stat.base_stat}
          </p>
        </div>
      ))}
    </div>
  );
}
