import { Pokemon } from './types';
import samplePokemon from './sample-pokemon.json';
import { fetchData } from './App';

const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomNumber = Math.ceil(Math.random() * 1010);
  const myPokemon = await fetchData(`pokemon/${randomNumber}`);
  console.log(myPokemon);

  if (!myPokemon) {
    return samplePokemon as Pokemon;
  }

  return myPokemon as Pokemon;
};

export default getRandomPokemon;
