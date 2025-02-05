import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        onClick={toggleMenu}
        aria-label="Ouvrir le menu"
      >
        {menuOpen ? (
          <FiX size="2.5rem" color="var(--secondary-color)" />
        ) : (
          <FiMenu size="2.5rem" color="var(--secondary-color)" />
        )}
      </button>

      <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
        <Link
          to="/"
          className={styles.navbar__logoContainer}
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/image_logo.png"
            alt="Retour à la page d'accueil"
            className={styles.navbar__logo}
          />
        </Link>
        <ul className={styles.navbar__links}>
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Profil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Administrator"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Administrateur
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Entreprise"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Entreprise
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Invitation"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Invitation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quizz"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Quizz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transmission"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
              Diffusion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/result"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles.navbar__linkActive}`
                  : styles.navbar__link
              }
              onClick={() => setMenuOpen(false)}
            >
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
            alt={
              isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"
            }
            className={styles.themeToggle__icon}
          />
        </button>
        <p className={styles.navbar__footer}>Wilders ❤️</p>
      </nav>
    </>
  );
};

export default Navbar;
