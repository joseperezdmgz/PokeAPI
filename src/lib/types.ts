export interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  generation: string;
  bgClass: string;
}

export interface PokemonProps {
  id: number;
  name: string;
  url: string;
}
