import React from 'react';
import { useFavorites } from "../context/FavoritesContext"; // Importer le contexte des favoris



const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites(); // Utiliser le contexte des favoris

  const handleRemoveFavorite = (id: number) => {
    removeFavorite(id);
  };

  return (
    <div className="favorites-container">
      <h1>Favoris</h1>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>Aucun Pokémon favori ajouté.</p>
        ) : (
          favorites.map(pokemon => (
            <div key={pokemon.id} className="favorite-item">
              <img className="pokemon-image" width="150px" src={pokemon.sprites.regular} alt="Pokémon" />
              <p>{pokemon.name}</p>
              <button onClick={() => handleRemoveFavorite(pokemon.id)}>Retirer des favoris</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;