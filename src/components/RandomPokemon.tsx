import React, { useState, useEffect } from 'react';
import '../assets/styles/RandomPokemon.css';

interface PokemonData {
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

interface RandomPokemonProps {
  isDarkMode: boolean;
}

const RandomPokemon: React.FC<RandomPokemonProps> = ({ isDarkMode }) => {
  const [data, setData] = useState<PokemonData | null>(null);
  const maxPokemon = 150;

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

  const generateRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;
    fetchPokemon(randomId);
  };

  useEffect(() => {
    generateRandomPokemon();
  }, []);

  const renderEvolutions = (evolutions: any) => {
    return <div>{/* Render evolutions here */}</div>;
  };

  return (
    <div className={`pokemon-container ${isDarkMode ? 'dark-mode' : ''}`}>
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
    </div>
  );
};

export default RandomPokemon;
