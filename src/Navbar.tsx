//import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>PokeApp API</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <NavLink to="/" style={styles.navLink}>Accueil</NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/pokemon-list" style={styles.navLink}>Liste Pokemon</NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/favorites" style={styles.navLink}>Mes pokemons préférés</NavLink>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'fixed',    
    top: 0,
    left: 0,
    width: '100%',        
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    zIndex: 1000,         
  },
  logo: {
    fontSize: '1.5rem',
  },
  navLinks: {
    listStyleType: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0, 
    padding: 0, 
  },
  navItem: {
    marginRight: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    display: 'block',
    padding: '10px 15px',
  },
  activeLink: {
    fontWeight: 'bold', 
    backgroundColor: '#1f2428',
    borderRadius: '5px',
  },
};

export default Navbar;
