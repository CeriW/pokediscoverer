import React, { useState, useEffect } from 'react';
import './App.css';
import getRandomPokemon from './getRandomPokemon';
import getHeldItem from './getHeldItem';
import samplePokemon from './sample-pokemon.json';
import { Pokemon } from './types';

const wikiLink = (url: string) => `https://bulbapedia.bulbagarden.net/wiki/${url}`;

const formatName = (name: string) => name.replace(/-/g, ' ');

const HeldItemsList = ({ list }) => {
  if (list.length === 0) {
    return;
  }

  const myList = list.map((item, index) => {
    const wikiName = item.name.replace(/-(.)/g, function (match, capturedCharacter) {
      const upperCaseCharacter = capturedCharacter.toUpperCase();
      return `_${upperCaseCharacter}`;
    });

    return (
      <a key={index} href={`https://bulbapedia.bulbagarden.net/wiki/${wikiName}`} target="_blank" rel="noreferrer">
        <img src={item.sprite} alt={`${item.name} sprite`} />
        {formatName(item.name)}
      </a>
    );
  });

  return (
    <div>
      <h3>Held items</h3>
      {myList}
    </div>
  );
};

const TypeList = ({ list }) => {
  const myList = list.map((item, index) => {
    const linkHref = `${wikiLink(item.type.name)}_(type)`;

    return (
      <a href={linkHref} target="_blank" key={index} className={item.type.name} rel="noreferrer">
        {item.type.name}
      </a>
    );
  });

  return (
    <div>
      <h3>Types</h3>
      {myList}
    </div>
  );
};

const BaseStatList = ({ list }) => {
  const myList = list.map((item, index) => {
    return (
      <div key={index}>
        <span>{formatName(item.stat.name)}:</span>
        <span>{item.base_stat}</span>
      </div>
    );
  });

  return (
    <div>
      <h3>Base stats</h3>
      {myList}
    </div>
  );
};

const WeightList = ({ hectograms }) => {
  const kg = hectograms / 10;
  const lbs = (hectograms * 0.22046226).toFixed(1);

  return (
    <div>
      Weight: {kg} kg ({lbs} lbs)
    </div>
  );
};

const HeightList = ({ decimeters }) => {
  const cm = decimeters * 10;
  const inches = Math.ceil(decimeters * 3.93700787);

  return (
    <div>
      Height: {cm} cm ({inches} inches)
    </div>
  );
};

// const getSpeciesInfo = async (id: number) => {
//   // Define the API endpoint URL
//   const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

//   // Make a GET request to the API
//   return fetch(apiUrl)
//     .then((response) => {
//       // Check if the response status is OK (status code 200)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Parse the JSON response and return it
//       return response.json();
//     })
//     .then((data) => {
//       // Return the data from the API
//       console.log(data);
//       return data;
//     })
//     .catch((error) => {
//       // Handle any errors that occur during the fetch
//       console.error('Error fetching data:', error);
//     });
// };

export default function App() {
  // const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(samplePokemon);
  const [heldItems, setHeldItems] = useState<{ name: string; sprite: string }[]>([]);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  // const [evolutionChain, setEvolutionChain] = useState(null);

  const fetchNewRandomPokemon = async () => {
    try {
      const newPokemon = await getRandomPokemon();
      console.log(newPokemon);
      setPokemon(newPokemon);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (pokemon) {
      const newHeldItemsPromises = pokemon.held_items.map(async (item) => {
        const itemInfo = await getHeldItem(item.item.url);
        return itemInfo;
      });

      Promise.all(newHeldItemsPromises)
        .then((resolvedHeldItems) => {
          console.log(resolvedHeldItems);
          setHeldItems(resolvedHeldItems);
        })
        .catch((error) => {
          console.error('Error fetching held items:', error);
        });
    }
  }, [pokemon]);

  // useEffect(() => {
  //   const fetchSpeciesInfo = async () => {
  //     try {
  //       const speciesInfo = await getSpeciesInfo(pokemon.id);
  //       console.log(speciesInfo);
  //       setSpeciesInfo(speciesInfo.evolutionChain);
  //     } catch (error) {
  //       console.error('Error fetching species:', error);
  //     }
  //   };

  //   if (pokemon) {
  //     fetchSpeciesInfo();
  //   }
  // }, [pokemon]);

  return (
    <div>
      <button onClick={fetchNewRandomPokemon}>Click me</button>
      {pokemon ? (
        <div>
          <HeldItemsList list={heldItems} />
          <TypeList list={pokemon.types} />
          <BaseStatList list={pokemon.stats} />
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="pokemon-id">#{pokemon.id}</div>
          <WeightList hectograms={pokemon.weight} />
          <HeightList decimeters={pokemon.height} />
          <div className="pokemon-sprites">
            <img src={pokemon.sprites.other['official-artwork']['front_default']} alt="" />
            <img src={pokemon.sprites.other['official-artwork']['front_shiny']} alt="" />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
