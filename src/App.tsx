import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home.tsx';
import PokemonList from './pages/PokemonList.tsx';
import Favorites from './pages/Favorites.tsx';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon-list" element={<PokemonList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  mainContent: {
    paddingTop: '60px',
    padding: '20px',
  },
};

export default App;
