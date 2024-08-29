import React from 'react';
import Pokemon from '../components/RandomPokemon';
import '../assets/styles/RandomPokemon.css';

interface HomeProps {
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  return (
    <div className='home'>
      <h1 className='title'>Bienvenue sur PokeApp API!</h1>
      <Pokemon isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;
