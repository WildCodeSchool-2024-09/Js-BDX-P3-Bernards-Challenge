import { useRef } from "react";
import styles from "./Home.module.css";

import type { FormEventHandler } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type Auth = {
  user: User;
  token: string;
};

const Home = () => {
  const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // Références pour les champs email et mot de passe
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password:
              /* rendering process ensures the ref is defined before the form is submitted */
              (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const user = await response.json();

        setAuth(user);

        navigate("/profil");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>Bernard's Challenges</h1>

      <section className={styles.home__section}>
        <h2 className={styles.section__title}>Connexion</h2>

        <form className={styles.home__form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="email" className={styles.home__label}>
              Email
            </label>
          </p>
          <input
            id="email"
            type="email"
            className={styles.home__input}
            required
            ref={emailRef}
          />

          <p>
            <label htmlFor="password" className={styles.home__label}>
              Mot de passe
            </label>
          </p>
          <input
            id="password"
            type="password"
            className={styles.home__input}
            required
            ref={passwordRef}
          />

          <button
            type="button"
            className={styles.home__forgotPassword}
            onClick={handleForgotPassword}
          >
            Mot de passe oublié ?
          </button>

          <button type="submit" className={styles.home__button}>
            Se connecter
          </button>
        </form>
      </section>
    </section>
  );
};

export default Home;
