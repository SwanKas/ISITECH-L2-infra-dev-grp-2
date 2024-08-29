import { useState, useEffect } from 'react';

interface Evolution {
  pokedex_id: number;
  name?: string;
  condition?: string;
  next?: Evolution[];
}

interface PokemonData {
  id: number;
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
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pokemon-container">
      
      <table className="pokemon-table">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Nom</th>
            <th>Hauteur</th>
            <th>Poids</th>
            <th>Type</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((pokemon) => (
            <tr key={pokemon.id}>
              
              <td>{pokemon.id}</td>
              <td>
                <img className="pokemon-image" width="50px" src={pokemon.sprites.regular} alt={pokemon.name.fr} />
              </td>
              <td>{pokemon.name.fr}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.types[0].name}</td>
              <button className='fav-button'>Ajouter au favoris</button>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
