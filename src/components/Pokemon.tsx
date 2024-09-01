import React, { useState, useEffect } from 'react';
import '../styles/Pokemon.css';
import { useFavorites } from '../context/FavoritesContext';

interface PokemonData {
  id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
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

const Pokemon: React.FC = () => {
  const [data, setData] = useState<PokemonData | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const maxPokemon = 150;
  const [isFavorite, setIsFavorite] = useState(false);


  const fetchPokemon = async (id: number) => {
    try {
      const res = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: PokemonData = await res.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setData(null);
    }
  };

  // Fonction pour générer un nouvel ID parmi les 150 premiers Pokémon
  const generateRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1; // ID entre 1 et 150
    fetchPokemon(randomId);
  };

  // Utiliser useEffect pour récupérer un Pokémon au chargement initial
  useEffect(() => {
    generateRandomPokemon(); // Charger un Pokémon au chargement du composant
  }, []);

  // Fonction pour afficher les évolutions si elles existent
  const renderEvolutions = (evolutions: any) => {

    return <div>{/* Render evolutions here */}</div>;
  };

  useEffect(() => {
    if (data) {
      const isCurrentlyFavorite = favorites.some(fav => fav.pokedex_id === data.id);
      setIsFavorite(isCurrentlyFavorite);
    }
  }, [data, favorites]);

  const handleAddFavorite = () => {
    if (data) {
      addFavorite({
        pokedex_id: data.id,
        name: {
          fr: data.name.fr,
        },
        sprites: data.sprites,
        height: data.height,
        weight: data.weight,
        types: data.types,
        evolution: data.evolution,
      });
      setIsFavorite(true);
    }
  };

  const handleRemoveFavorite = () => {
    if (data) {
      removeFavorite(data.id);
      setIsFavorite(false);
    }
  };
  useEffect(() => {
    if (data) {
      setIsFavorite(favorites.some(fav => fav.pokedex_id === data.id));
    }
  }, [data]);


  return (
    <div className="pokemon-container">
      <div className="pokemon-infos-global">
        <h1 className="pokemon-title">Pokémon</h1>
        {data && (
          <div className="pokemon-info">
            <img className="pokemon-image" width="200px" src={data.sprites.regular} alt="Pokémon" />
            <p className="pokemon-info pokemon-name">Nom : {data.name.fr}</p>
            <p className="pokemon-info pokemon-height">Hauteur : {data.height}</p>
            <p className="pokemon-info pokemon-weight">Poids : {data.weight}</p>
            <p className="pokemon-info pokemon-type">
              <span className="pokemon-type-label">Type 1 :</span>
              <div className="pokemon-type-image-container">
                <p className="pokemon-type">{data.types[0].name}</p>
                <img width="25px" className="pokemon-image" src={data.types[0].image} alt={data.types[0].name} />
              </div>
            </p>
            <p className="pokemon-info pokemon-type">
              <span className="pokemon-type-label">Type 2 :</span>
              {data.types[1] ? (
                <>
                  <p className="pokemon-type">{data.types[1].name}</p>
                  <div className="pokemon-type-image-container">
                    <img width="25px" className="pokemon-image" src={data.types[1].image} alt={data.types[1].name} />
                  </div>
                </>
              ) : (
                'Aucun'
              )}
            </p>
          </div>
        )}
        {data && data.evolution && renderEvolutions(data.evolution)}
      </div>
      <button className="pokemon-button" onClick={generateRandomPokemon}>Générer un nouveau Pokémon</button>
      <button
        className="pokemon-button"
        onClick={handleAddFavorite}
        disabled={isFavorite} // Désactiver si déjà favori
      >
        Ajouter aux favoris
      </button>
      <button
        className="pokemon-button"
        onClick={handleRemoveFavorite}
        disabled={!isFavorite} // Désactiver si pas encore favori
      >
        Retirer des favoris
      </button>
    </div>
  );
};

export default Pokemon;
