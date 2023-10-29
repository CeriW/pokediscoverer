import { Pokemon } from './types';
import samplePokemon from './sample-pokemon.json';
import favPokemon from './my-fav-pokemon.json';
import fetchData from './fetchData';

const getNewPokemon = async (pokemonId?: number): Promise<Pokemon> => {
  if (pokemonId === 2) {
    return favPokemon as Pokemon;
  }

  const pokemonIdToFetch = pokemonId ? pokemonId : Math.ceil(Math.random() * 1021);
  const myPokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonIdToFetch}`);

  if (!myPokemon) {
    return samplePokemon as Pokemon;
  }

  return myPokemon as Pokemon;
};

export default getNewPokemon;
