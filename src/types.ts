export type Pokemon = {
  name: string;
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: PokemonTypeList;
  stats: PokemonBaseStats;
  held_items: PokemonHeldItem[];
  weight: number;
  height: number;
  [key: string]: any;
};

export type PokemonBaseStats = { base_stat: number; stat: { name: string } }[];
export type PokemonTypeList = { type: { name: string } }[];
export type PokemonHeldItem = { item: { name: string; url: string } };
