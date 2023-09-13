import React, { createContext, useContext, useState, useEffect } from 'react';
import './App.css';

type Pokemon = {
  name: string;
  id: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

const emptyPokemon: Pokemon = {
  name: '',
  id: '',
  sprites: {
    other: {
      'official-artwork': {
        front_default: '',
      },
    },
  },
};

interface PokemonContextValue {
  pokemon: Pokemon | null;
  updatePokemonName: () => Promise<void>;
}

const PokemonContext = createContext<PokemonContextValue>({
  pokemon: null,
  updatePokemonName: async () => {},
});

const updatePokemon = async () => {
  const randomNumber = Math.floor(Math.random() * 1010);
  try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { name: '' }; // Return an empty object in case of an error
  }
};

const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemon, setPokemon] = useState(emptyPokemon);

  const updatePokemonName = async () => {
    const newPokemon = await updatePokemon();
    setPokemon(newPokemon);
  };

  useEffect(() => {
    updatePokemonName();
  }, []);

  return <PokemonContext.Provider value={{ pokemon, updatePokemonName }}>{children}</PokemonContext.Provider>;
};

const PokemonCard = () => {
  const { pokemon } = useContext<PokemonContextValue>(PokemonContext);

  return (
    <div>
      <h2>{pokemon?.name}</h2>
      <div>#{pokemon?.id}</div>
      <img className="pokemon-img" src={pokemon?.sprites.other['official-artwork']['front_default']} alt="" />
    </div>
  );
};

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <PokemonCard />
        <PokemonContext.Consumer>
          {(pokemonContext) => (
            <button id="new-pokemon-button" onClick={() => pokemonContext.updatePokemonName()}>
              Click me
            </button>
          )}
        </PokemonContext.Consumer>
      </div>
    </PokemonProvider>
  );
}

export default App;
