import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomPokemon from './components/RandomPokemon';
import { FavoritesProvider } from './context/FavoritesContext';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      pokedex_id: 1,
      name: { fr: 'Bulbizarre' },
      sprites: { regular: 'https://example.com/bulbizarre.png' },
      height: 7,
      weight: 69,
      types: [{ name: 'Plante', image: 'https://example.com/plante.png' }],
    }),
  })
);

describe('RandomPokemon and FavoritesContext Integration', () => {
  it('allows adding a random Pokémon to favorites', async () => {
    render(
      <FavoritesProvider>
        <RandomPokemon isDarkMode={false} />
      </FavoritesProvider>
    );

    const addToFavoritesButton = await screen.findByText('Ajouter aux favoris');
    expect(addToFavoritesButton).toBeInTheDocument();

    fireEvent.click(addToFavoritesButton);

    const removeFromFavoritesButton = screen.getByText('Retirer des favoris');
    expect(removeFromFavoritesButton).toBeInTheDocument();

    fireEvent.click(removeFromFavoritesButton);

    await waitFor(() => {
      expect(screen.getByText('Ajouter aux favoris')).toBeInTheDocument();
    });
  });

  it('fetches and displays a random Pokémon', async () => {
    render(
      <FavoritesProvider>
        <RandomPokemon isDarkMode={false} />
      </FavoritesProvider>
    );

    const pokemonNameElement = await screen.findByText('Nom : Bulbizarre');
    expect(pokemonNameElement).toBeInTheDocument();

    const pokemonHeight = screen.getByText('Hauteur : 7');
    expect(pokemonHeight).toBeInTheDocument();

    const pokemonWeight = screen.getByText('Poids : 69');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonType = screen.getByText('Plante');
    expect(pokemonType).toBeInTheDocument();
  });

  it('fetches a new Pokémon when the "Générer un nouveau Pokémon" button is clicked', async () => {
    render(
      <FavoritesProvider>
        <RandomPokemon isDarkMode={false} />
      </FavoritesProvider>
    );

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          pokedex_id: 4,
          name: { fr: 'Bulbizarre' },
          sprites: { regular: 'https://example.com/salameche.png' },
          height: 6,
          weight: 85,
          types: [{ name: 'Feu', image: 'https://example.com/feu.png' }],
        }),
      })
    );

    const generateButton = screen.getByText('Générer un nouveau Pokémon');
    fireEvent.click(generateButton);

    const pokemonNameElement = await screen.findByText('Nom : Bulbizarre');
    expect(pokemonNameElement).toBeInTheDocument();
  });
});
