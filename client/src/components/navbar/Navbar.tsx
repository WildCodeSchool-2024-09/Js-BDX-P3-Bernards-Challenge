import { Link, NavLink } from "react-router-dom";
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
        <li>
          <NavLink to="/profil" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/Administrateur" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Administrateur
          </NavLink>
        </li>
        <li>
          <NavLink to="/Entreprise" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Entreprise
          </NavLink>
        </li>
        <li>
          <NavLink to="/Invitation" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Invitation
          </NavLink>
        </li>
        <li>
          <NavLink to="/quizz" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Quizz
          </NavLink>
        </li>
        <li>
          <NavLink to="/transmission" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Diffusion
          </NavLink>
        </li>
        <li>
          <NavLink to="/result" className={({ isActive }) => isActive ? `${styles.navbar__link} ${styles.navbar__linkActive}` : styles.navbar__link}>
            Résultat
          </NavLink>
        </li>
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