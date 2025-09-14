export interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
  generation: string;
  bgClass: string;
}

export interface PokemonProps {
  id: number;
  name: string;
  url?: string;
  sprite: string;
  types: { type: { name: string } }[];
  generation: string;
  bgClass: string;
}

export interface EvolutionProps {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonViewProps {
  id: number;
  name: string;
  url?: string;
  sprite: string;
  types: { type: { name: string } }[];
  generation: string;
  bgClass: string;
  stats: { base_stat: number; stat: { name: string } }[];
  evolutions: EvolutionProps[];
}
