import styles from "./Home.module.css";

const Home = () => {
  const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>Bernard's Challenges</h1>
      <p className={styles.home__description}>Rejoignez-nous sur Slack</p>

      <section className={styles.home__section}>
        <h2 className={styles.section__title}>Connexion</h2>

        <form className={styles.home__form}>
          <p>
            <label htmlFor="email" className={styles.home__label}>Email</label>
          </p>
          <input
            id="email"
            type="email"
            className={styles.home__input}
            required
          />

          <p>
            <label htmlFor="password" className={styles.home__label}>Mot de passe</label>
          </p>
          <input
            id="password"
            type="password"
            className={styles.home__input}
            required
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