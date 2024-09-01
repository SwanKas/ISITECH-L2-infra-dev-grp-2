import { createContext, useContext, useState, ReactNode } from 'react';

interface Pokemon {
  id: number;
  name: string;
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
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(p => p.id === pokemon.id)) {
        return [...prevFavorites, pokemon];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter(p => p.id !== pokemonId));
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
