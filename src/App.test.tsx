import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/Random Pokemon generator/i);
  expect(title).toBeInTheDocument();

  // expect(screen.getByText(/Random Pokemon generator/)).toBeInTheDocument();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
