import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomPokemon from './components/RandomPokemon';
import { vi } from 'vitest';

// Simule la génération d'un pokemon 
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      name: { fr: 'Pikachu' }, 
      sprites: { regular: 'https://example.com/pikachu.png' },
      height: 4, 
      weight: 60, 
      types: [{ name: 'Électrique', image: 'https://example.com/electric.png' }], 
    }),
  })
);

describe('RandomPokemon Component', () => {
  it('displays a Pokémon name', async () => {
    render(<RandomPokemon isDarkMode={false} />);

    // Verifie l'affichage du pokemon sur la page
    const pokemonName = await screen.findByText(/Nom : \w+/);
    expect(pokemonName).toBeInTheDocument();
  });
});
