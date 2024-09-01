import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PokemonData {
  pokedex_id: number;
  name: {
    fr: string;
  };
  sprites: {
    regular: string;
  };
  height: number;
  weight: number;
  types: {
    name: string;
    image: string;
  }[];
  evolution?: any;
}

interface FavoritesContextType {
  favorites: PokemonData[];
  addFavorite: (pokemon: PokemonData) => void;
  removeFavorite: (pokemonId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<PokemonData[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: PokemonData) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(p => p.pokedex_id === pokemon.pokedex_id)) {
        return [...prevFavorites, pokemon];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter(p => p.pokedex_id !== pokemonId));
  };
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
