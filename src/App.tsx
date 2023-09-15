import React, { useState, useEffect } from 'react';
import './App.scss';
import getRandomPokemon from './getRandomPokemon';
import getHeldItem from './getHeldItem';
import samplePokemon from './sample-pokemon.json';
import { Pokemon } from './types';

const wikiLink = (url: string) => encodeURI(`https://bulbapedia.bulbagarden.net/wiki/${url}`);

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
    <div className="held-items-list">
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

  return <div className="type-list">{myList}</div>;
};

const BaseStatList = ({ list }) => {
  const myList = list.map((item, index) => {
    return (
      <div key={index} className={item.stat.name}>
        <span>{formatName(item.stat.name)}</span>
        <span>{item.base_stat}</span>
      </div>
    );
  });

  return (
    <div className="base-stats">
      <h3>
        Base stats
        <a href="https://bulbapedia.bulbagarden.net/wiki/Stat#List_of_stats" target="_blank" rel="noreferrer">
          ?
        </a>
      </h3>
      {myList}
    </div>
  );
};

const WeightList = ({ hectograms }) => {
  const kg = hectograms / 10;
  const lbs = (hectograms * 0.22046226).toFixed(1);

  return (
    <div>
      <b>Weight</b>: {kg} kg ({lbs} lbs)
    </div>
  );
};

const HeightList = ({ decimeters }) => {
  const cm = decimeters * 10;
  const inches = Math.ceil(decimeters * 3.93700787);

  return (
    <div>
      <b>Height</b>: {cm} cm ({inches} inches)
    </div>
  );
};

const GenerationDisplay = ({ id }) => {
  const calculateGeneration = (id: number): string | undefined => {
    console.log(id);
    if (id <= 151) {
      return 'Red/Blue (gen 1)';
    }
    if (id <= 251) {
      return 'Gold/Silver (gen 2)';
    }
    if (id <= 386) {
      return 'Ruby/Sapphire (gen 3)';
    }
    if (id <= 493) {
      return 'Diamond/Pearl (gen 4)';
    }
    if (id <= 649) {
      return 'Black/White (gen 5)';
    }
    if (id <= 721) {
      return 'X/Y (gen 6)';
    }
    if (id <= 809) {
      return 'Sun/Moon (gen 7)';
    }
    if (id <= 905) {
      return 'Sword/Shield (gen 8)';
    }
    if (id <= 1021) {
      return 'Scarlet/Violet (gen 9)';
    }

    return;
  };

  const generationText = calculateGeneration(id);

  return (
    <div>
      <b>First seen in</b>:<br />
      Pokemon {generationText}
    </div>
  );
};

export default function App() {
  // const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(samplePokemon);
  const [heldItems, setHeldItems] = useState<{ name: string; sprite: string }[]>([]);

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
          setHeldItems(resolvedHeldItems);
        })
        .catch((error) => {
          console.error('Error fetching held items:', error);
        });
    }
  }, [pokemon]);

  return (
    <div>
      <button onClick={fetchNewRandomPokemon}>Click me</button>
      {pokemon ? (
        <div className="pokemon-card">
          <div className="pokemon-header">
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="pokemon-id">#{pokemon.id}</div>
          </div>
          <div className="pokemon-data">
            <div>
              <TypeList list={pokemon.types} />
              <GenerationDisplay id={pokemon.id} />
              <div className="pokemon-info">
                <WeightList hectograms={pokemon.weight} />
                <HeightList decimeters={pokemon.height} />
              </div>
              <BaseStatList list={pokemon.stats} />
              <HeldItemsList list={heldItems} />
              <div>
                {/* <div className="pokemon-sprites">
                  <img src={pokemon.sprites.other['official-artwork']['front_default']} alt="" />
                  <img src={pokemon.sprites.other['official-artwork']['front_shiny']} alt="" />
                </div> */}
              </div>
            </div>
            <img src={pokemon.sprites.other['official-artwork']['front_default']} alt="" />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
