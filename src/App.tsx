import React, { useState, useEffect } from 'react';
import './App.css';
import getRandomPokemon from './getRandomPokemon';
import samplePokemon from './sample-pokemon.json';

export type Pokemon = {
  name: string;
  [key: string]: any;
};

export default function App() {
  const [pokemon, setPokemon] = useState(samplePokemon as Pokemon);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const myPokemon = await getRandomPokemon();
        console.log(myPokemon);
        setPokemon(myPokemon);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchPokemon();
  }, []);

  return <div>{pokemon.name}</div>;
}
