# Random Pokemon Generator

This project was created as my first proper foray into learning React. It randomly generates a pokemon ID number and then uses [PokeAPI](https://pokeapi.co/) to display information about that pokemon back to the user.

## Tech details

- Created using create-react-app
- Written in Typescript with typing used throughout
- Uses async/await functions to call [PokeAPI](https://pokeapi.co/)
- Has a sample pokemon (Pikachu) stored in a json file for use should the API call fail
- Auto-deploys to Github Pages using a yaml CI/CD action whenever changes are made to the master branch
- Includes some basic Jest testing
- Styled using SCSS

## Running locally

You will need [Node](https://nodejs.org/en) installed to be able to run this on your computer.

- In your terminal, ensure you have the necessary npm packages installed by running `npm install`
- `npm start` will then run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Legal

All pokemon info displayed is Copyright The Pokémon Company.
