import { useState, useEffect } from 'react';
import './App.scss';
import getNewPokemon from './getRandomPokemon';
import getHeldItem from './getHeldItem';
import samplePokemon from './sample-pokemon.json';
import { Pokemon } from './types';
import { Autocomplete, TextField } from '@mui/material';
import pokemonList from './pokemon-list.json';

const wikiLink = (url: string) => encodeURI(`https://bulbapedia.bulbagarden.net/wiki/${url}`);

const formatName = (name: string) => name.replace(/-/g, ' ');

const HeldItemsList = ({ list }) => {
  if (list.length === 0) {
    return;
  }

  const myList = list.map((item, index) => {
    const wikiName = item.name.replace(/-(.)/g, function (capturedCharacter) {
      const upperCaseCharacter = capturedCharacter.toUpperCase();
      return `_${upperCaseCharacter}`;
    });

    return (
      <a
        key={index}
        href={`https://bulbapedia.bulbagarden.net/wiki/${wikiName}`}
        target="_blank"
        rel="noreferrer"
        data-testid={`held-item-${index}`}
      >
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
      <div key={index} className={item.stat.name} data-testid={`base-stat-${item.stat.name}`}>
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

const SpriteList = ({ spriteList }) => {
  const differentGenders = spriteList.front_female as Boolean;

  const MixedGenderSprites = () => {
    return (
      <div className="different-gender-sprite-list">
        <figure>
          <picture>
            <source srcSet={spriteList.front_default} type="image/png" />
            <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
          </picture>
          <figcaption>
            <span>&nbsp;</span>
            <img src="icons/male.svg" alt="male" width="25" />
          </figcaption>
        </figure>
        <figure>
          <picture>
            <source srcSet={spriteList.front_female} type="image/png" />
            <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
          </picture>
          <figcaption>
            <span></span>
            <img src="icons/female.svg" alt="female" width="25" />
          </figcaption>
        </figure>
        <figure>
          {spriteList.front_shiny && (
            <div>
              <picture>
                <source srcSet={spriteList.front_shiny} type="image/png" />
                <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
              </picture>
              <figcaption>
                shiny <img src="icons/male.svg" alt="male" width="25" />
              </figcaption>
            </div>
          )}
        </figure>
        <figure>
          {spriteList.front_shiny_female && (
            <div>
              <picture>
                <source srcSet={spriteList.front_shiny_female} type="image/png" />
                <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
              </picture>
              <figcaption>
                shiny <img src="icons/female.svg" alt="female" width="25" />
              </figcaption>
            </div>
          )}
        </figure>
      </div>
    );
  };

  const SameGenderSprites = () => {
    return (
      <div className="same-gender-sprite-list">
        <figure>
          <picture>
            <source srcSet={spriteList.front_default} type="image/png" />
            <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
          </picture>

          <figcaption>default</figcaption>
        </figure>
        {spriteList.front_shiny && (
          <figure>
            <picture>
              <source srcSet={spriteList.front_shiny} type="image/png" />
              <img src="icons/sprite-placeholder.svg" alt="Missing sprite" width="96" />
            </picture>

            <figcaption>
              shiny{/* shiny <img src="icons/both-genders.svg" alt="both genders" width="35" /> */}
            </figcaption>
          </figure>
        )}
      </div>
    );
  };

  return (
    <div className="sprite-list">
      <h3>Sprites</h3>
      {differentGenders && (
        <div>
          <MixedGenderSprites />
        </div>
      )}

      {!differentGenders && <SameGenderSprites />}
    </div>
  );
};

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(samplePokemon);
  const [heldItems, setHeldItems] = useState<{ name: string; sprite: string }[]>([]);
  const [mainTheme, setMainTheme] = useState('default');
  const [subTheme, setSubTheme] = useState('default');

  const date = new Date();
  const pokemonOfTheDayId = date.getDay() + 1 * date.getDate() * Math.ceil(date.getMonth() / 3) + 1;

  const fetchNewPokemon = async (id?: number | string) => {
    if (pokemon.id !== id) {
      try {
        const newPokemon = await getNewPokemon(id);
        setPokemon(newPokemon);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    setMainTheme(pokemon.types[0].type.name);
    const subTheme = pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name;
    setSubTheme(subTheme);
  }, [pokemon]);

  useEffect(() => {
    setHeldItems([]);

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

  const themeClassName = `${mainTheme} sub-theme-${subTheme}`;

  return (
    <div id="app" className={themeClassName}>
      <h1>Random Pokemon generator</h1>

      <div className="button-panel">
        <div>
          <button
            onClick={(e) => {
              fetchNewPokemon();
              const thisButton = e.currentTarget;
              thisButton.disabled = true;
              setTimeout(() => {
                thisButton.disabled = false;
              }, 1500);
            }}
            data-testid="random-pokemon-btn"
          >
            Give me a random pokemon
          </button>
          <button
            onClick={() => {
              fetchNewPokemon(pokemonOfTheDayId);
            }}
            data-testid="pokemon-of-the-day-btn"
          >
            Pokemon of the day
          </button>
        </div>

        <div className="pokemon-selector">
          <Autocomplete
            options={pokemonList}
            sx={{
              width: 200,
            }}
            value={null}
            onChange={(event: any, newValue: string | null) => {
              if (newValue) {
                fetchNewPokemon(newValue?.toLowerCase());
                event.target.value = null;
              }
            }}
            renderInput={(params) => <TextField {...params} label="Search" variant="standard" />}
          />
        </div>
      </div>
      {pokemon ? (
        <div className="pokemon-card" data-testid="pokemon-card">
          <div className="pokemon-header">
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="pokemon-id">#{pokemon.id}</div>
          </div>
          <div className="pokemon-data">
            <div className="pokemon-text">
              <TypeList list={pokemon.types} />
              <GenerationDisplay id={pokemon.id} />
              <div className="pokemon-info">
                <WeightList hectograms={pokemon.weight} />
                <HeightList decimeters={pokemon.height} />
              </div>
              <BaseStatList list={pokemon.stats} />
              <div className="held-items-container">
                <HeldItemsList list={heldItems} />
              </div>
            </div>
            <SpriteList spriteList={pokemon.sprites} />
            <img className="main-artwork" src={pokemon.sprites.other['official-artwork']['front_default']} alt="" />
          </div>
        </div>
      ) : (
        ''
      )}
      <footer>
        <div>
          <a href="https://github.com/cherrycodesnet/random-pokemon" target="_blank" rel="noreferrer">
            About this project
          </a>
          <div
            className="my-fav-pokemon"
            onClick={() => {
              fetchNewPokemon(2);
            }}
          >
            Developer's favourite pokemon
          </div>
        </div>

        <sub>All info and images are © The Pokemon Company and Nintendo</sub>
      </footer>
    </div>
  );
}
