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

test('renders pikachu info on first load', async () => {
  render(<App />);
  expect(screen.getByText('pikachu')).toBeInTheDocument();
  expect(screen.getByText('#25')).toBeInTheDocument();
  expect(screen.getByTestId('base-stat-hp')).toBeInTheDocument();
  expect(screen.getByText('electric')).toBeInTheDocument();
});
