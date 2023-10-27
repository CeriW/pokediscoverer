import { render, screen } from '@testing-library/react';
import App from './App';

test('renders basic page content', () => {
  render(<App />);
  const title = screen.getByText(/Random Pokemon generator/i);
  expect(title).toBeInTheDocument();

  const generateButton = screen.getByTestId('random-pokemon-btn');
  expect(generateButton).toBeInTheDocument();

  const pokemonOfTheDayButton = screen.getByTestId('pokemon-of-the-day-btn');
  expect(pokemonOfTheDayButton).toBeInTheDocument();
});

test('renders pikachu info on first load', () => {
  render(<App />);
  const pokemonData = screen.getByTestId('pokemon-card').textContent;
  expect(pokemonData).toContain('pikachu');
  expect(pokemonData).toContain('#25');
  expect(pokemonData).toContain('hp35');
  expect(pokemonData).toContain('Pokemon Red/Blue (gen 1)');
  expect(pokemonData).toContain('Weight: 6 kg (13.2 lbs)');
  expect(pokemonData).toContain('electric');
});
