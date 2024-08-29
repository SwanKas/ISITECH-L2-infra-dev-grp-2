import React, { useState, useEffect } from 'react';
import '../styles/Pokemon.css'; // Assurez-vous que ce fichier CSS est présent

interface PokemonData {
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string; // URL de l'image du Pokémon
  };
  height: number;
  weight: number;
  types: {
    name: string;
    image: string;
  }[];
  evolution?: any; // Définissez ce type selon vos données d'évolution
}

const Pokemon: React.FC = () => {
  const [data, setData] = useState<PokemonData | null>(null);
  const maxPokemon = 150; // Limiter aux 150 premiers Pokémon

  // Fonction pour récupérer un Pokémon par ID
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
      setData(null); // Vous pouvez afficher un message d'erreur ici si vous le souhaitez
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
    // Implémentez cette fonction selon vos données d'évolution
    return <div>{/* Render evolutions here */}</div>;
  };

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
    </div>
  );
};

export default Pokemon;
