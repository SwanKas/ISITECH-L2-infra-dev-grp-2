import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';

interface Evolution {
  pokedex_id: number;
  name?: string;
  condition?: string;
  next?: Evolution[];
}

interface PokemonData {
  pokedex_id: number;
  sprites: {
    regular: string;
  };
  name: {
    fr: string;
  };
  height: number;
  weight: number;
  types: {
    name: string;
    image: string;
  }[];
  evolution?: Evolution;
}

export default function PokemonList() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const fetchData = async () => {
    try {
      const pokemonList: PokemonData[] = [];

      for (let i = 1; i <= 150; i++) {
        const res = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${i}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const pokemon: PokemonData = await res.json();
        pokemonList.push(pokemon);
      }

      setData(pokemonList);
      setIsLoading(false); // Arrête l'état de chargement une fois les données récupérées
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false); // Arrête l'état de chargement même en cas d'erreur
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isPokemonFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.pokedex_id === pokemonId);
  };
  const handleAddFavorite = (pokemon: PokemonData) => {
    addFavorite(pokemon);
  };


  const handleRemoveFavorite = (pokemonId: number) => {
    removeFavorite(pokemonId);
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as 'collapse',
      margin: '20px 0',
      fontSize: '18px',
      textAlign: 'left' as 'left',
    },
    thTd: {
      padding: '12px 15px',
      border: '1px solid #ddd',
    },
    th: {

    },
    image: {
      display: 'block',
      margin: '0 auto',
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    spinner: {
      border: '8px solid #f3f3f3',
      borderTop: '8px solid #3498db',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      animation: 'spin 1s linear infinite',
    },
    favButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    favButtonHover: {
      backgroundColor: '#2980b9',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {isLoading ? (
        <div style={styles.loadingSpinner}>
          <div style={styles.spinner}></div>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Numéro pokedex</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Hauteur</th>
              <th style={styles.th}>Poids</th>
              <th style={styles.th}>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pokemon) => {
              const isFavorite = isPokemonFavorite(pokemon.pokedex_id);
              return (
                <tr key={pokemon.pokedex_id}>
                  <td style={styles.thTd}>{pokemon.pokedex_id}</td>
                  <td style={styles.thTd}>
                    <img style={styles.image} width="50px" src={pokemon.sprites.regular} alt={pokemon.name.fr} />
                  </td>
                  <td style={styles.thTd}>{pokemon.name.fr}</td>
                  <td style={styles.thTd}>{pokemon.height}</td>
                  <td style={styles.thTd}>{pokemon.weight}</td>
                  <td style={styles.thTd}>{pokemon.types[0].name}</td>
                  <td style={styles.thTd}>
                    {isFavorite ? (
                      <button
                        style={styles.favButton}
                        onClick={() => handleRemoveFavorite(pokemon.pokedex_id)}
                      >
                        Retirer des favoris
                      </button>
                    ) : (
                      <button
                        style={styles.favButton}
                        onClick={() => handleAddFavorite(pokemon)}
                      >
                        Ajouter aux favoris
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
