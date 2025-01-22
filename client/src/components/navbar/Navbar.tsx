import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar__logoContainer}>
        <img 
          src="/images/image_logo.png" 
          alt="Retour à la page d'accueil" 
          className={styles.navbar__logo} 
        />
      </Link>
      <ul className={styles.navbar__links}>
        <li><Link to="/profil">Profil</Link></li>
        <li><Link to="/Administrateur">Administrateur</Link></li>
        <li><Link to="/Invitation">Invitation</Link></li>
        <li><Link to="/quizz">Quizz</Link></li>
        <li><Link to="/transmission">Diffusion</Link></li>
        <li><Link to="/result">Résultat</Link></li>
      </ul>
      <button
        type="button"
        onClick={toggleTheme}
        className={styles.themeToggle}
        aria-label="Changer le thème"
      >
        <img
          src={isDarkMode ? "/images/white.png" : "/images/dark.png"}
          alt={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          className={styles.themeToggle__icon}
        />
      </button>
      <p className={styles.navbar__footer}>Wilders ❤️</p>
    </nav>
  );
};

export default Navbar;