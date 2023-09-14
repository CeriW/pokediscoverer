import { Pokemon } from './types';
import samplePokemon from './sample-pokemon.json';

const getRandomPokemon = (): Promise<Pokemon> => {
  const randomNumber = Math.ceil(Math.random() * 1010);
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json() as unknown as Pokemon; // Cast the result as Pokemon
    })
    .catch((error) => {
      console.error('Error:', error);
      // return undefined; // Return undefined in case of an error
      return samplePokemon as Pokemon;
    });
};

export default getRandomPokemon;
