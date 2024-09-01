import React from 'react';
import { useFavorites } from "../context/FavoritesContext";
import '../assets/styles/Favorites.css';

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();


  return (
    <div className="favorites-container">
      <h1>Favoris</h1>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>Aucun Pokémon favori ajouté.</p>
        ) : (
          favorites.map(pokemon => (
            <div key={pokemon.pokedex_id} className="favorite-item">
              <div className="pokemon-info">
                <img className="pokemon-image" width="200px" src={pokemon.sprites.regular} alt="Pokémon" />
                <p className="pokemon-info pokemon-name">Numéro pokedex : {pokemon.pokedex_id}</p>
                <p className="pokemon-info pokemon-name">Nom : {pokemon.name.fr}</p>
                <p className="pokemon-info pokemon-height">Hauteur : {pokemon.height}</p>
                <p className="pokemon-info pokemon-weight">Poids : {pokemon.weight}</p>
                <p className="pokemon-info pokemon-type">
                  <span className="pokemon-type-label">Type 1 :</span>
                  <div className="pokemon-type-image-container">
                    <p className="pokemon-type">{pokemon.types[0].name}</p>
                    <img width="25px" className="pokemon-image" src={pokemon.types[0].image} alt={pokemon.types[0].name} />
                  </div>
                </p>
                <p className="pokemon-info pokemon-type">
                  <span className="pokemon-type-label">Type 2 :</span>
                  {pokemon.types[1] ? (
                    <>
                      <p className="pokemon-type">{pokemon.types[1].name}</p>
                      <div className="pokemon-type-image-container">
                        <img width="25px" className="pokemon-image" src={pokemon.types[1].image} alt={pokemon.types[1].name} />
                      </div>
                    </>
                  ) : (
                    'Aucun'
                  )}
                </p>
              </div>
              <button onClick={() => removeFavorite(pokemon.pokedex_id)}>Retirer des favoris</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;