import React from 'react';

interface NavbarProps {
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode }) => {
  return (
    <nav
      style={{
        ...styles.navbar,
        backgroundColor: isDarkMode ? 'white' : '#282c34',
        color: isDarkMode ? '#282c34' : 'white',
      }}
    >
      <div style={styles.logo}>PokeApp API</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}><a href="/" style={styles.navLink}>Accueil</a></li>
        <li style={styles.navItem}><a href="/pokemon-list" style={styles.navLink}>Liste Pokemon</a></li>
        <li style={styles.navItem}><a href="/favorites" style={styles.navLink}>Pokemon préférées</a></li>
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
    color: 'inherit',
    display: 'block',
    padding: '10px 15px',
  },
};

export default Navbar;
