import styles from "./Transmission.module.css";

const Transmission = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className={styles.transmission}>
      <h1 className={styles.transmission__title}>Diffusion</h1>
      <p className={styles.transmission__description}>
        Gestion des transmissions de données
      </p>

      <section className={`${styles.section} ${styles["section--enterprises"]}`}>
        <h2 className={styles.section__title}>Liste des Entreprises</h2>
        <select className={styles.dropdown}>
          <option>Entreprise 1</option>
          <option>Entreprise 2</option>
          <option>Entreprise 3</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--channels"]}`}>
        <h2 className={styles.section__title}>Liste des Channels Slack</h2>
        <select className={styles.dropdown}>
          <option>marketing</option>
          <option>dev</option>
          <option>sales</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--quiz"]}`}>
        <h2 className={styles.section__title}>Choix du Quiz</h2>
        <select className={styles.dropdown}>
          <option>Quiz 1</option>
          <option>Quiz 2</option>
          <option>Quiz 3</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--send"]}`}>
        <h2 className={styles.section__title}>Envoyer sur Slack</h2>
        <button
          type="button"
          className={styles.transmission__slackButton}
          onClick={handleSubmit}
        >
          Envoyer sur Slack
        </button>
      </section>
    </section>
  );
};

export default Transmission;