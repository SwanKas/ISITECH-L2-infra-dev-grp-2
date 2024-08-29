import { useState, useEffect } from 'react';
import Navbar from './Navbar.tsx';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Favorites from './pages/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div>
        <Navbar />
        <button
          style={{
            ...styles.toggleButton,
            backgroundColor: isDarkMode ? 'white' : '#282c34',
            color: isDarkMode ? '#282c34' : 'white',
          }}
          onClick={toggleTheme}
        >
        {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route path="/favorites" element={<Favorites />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  mainContent: {
    paddingTop: '60px',
    padding: '20px',
  },
  toggleButton: {
    position: 'fixed',
    top: '100px',        
    left: '30px',       
    padding: '10px 15px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
};

export default App;
