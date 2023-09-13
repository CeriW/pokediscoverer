import React, { createContext, useContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface PokemonContextValue {
  pokemon: { name: string };
  updatePokemonName: () => Promise<void>;
}

const PokemonContext = createContext<PokemonContextValue>({
  pokemon: { name: '' },
  updatePokemonName: async () => {},
});

const PokemonCard = () => {
  const pokemon = useContext<PokemonContextValue>(PokemonContext);

  return <div>Hello {pokemon.pokemon.name}</div>;
};

const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemon, setPokemon] = useState({ name: '' });

  const randomNumber = Math.floor(Math.random() * 1010);

  const updatePokemon = async () => {
    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPokemon({ name: data.name });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    updatePokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, updatePokemonName: updatePokemon }}>{children}</PokemonContext.Provider>
  );
};

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <PokemonCard />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </PokemonProvider>
  );
}

export default App;
