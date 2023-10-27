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
