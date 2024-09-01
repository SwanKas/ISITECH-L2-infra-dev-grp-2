import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomPokemon from './components/RandomPokemon';
import { FavoritesProvider } from './context/FavoritesContext';
import { vi } from 'vitest';

// Simule la génération d'un pokemon 
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      name: { fr: 'Bulbizarre' }, 
      sprites: { regular: 'https://example.com/pikachu.png' },
      height: 4, 
      weight: 60, 
      types: [{ name: 'Électrique', image: 'https://example.com/electric.png' }], 
    }),
  })
);

describe('RandomPokemon Component', () => {
  it('displays a Pokémon name', async () => {
    render(
      <FavoritesProvider>
        <RandomPokemon isDarkMode={false} />
      </FavoritesProvider>
    );

    // Vérifie l'affichage du nom du Pokémon sans utilisation d'une expression régulière
    const pokemonNameElement = await screen.findByText('Nom : Bulbizarre');
    expect(pokemonNameElement).toBeInTheDocument();
  });
});
