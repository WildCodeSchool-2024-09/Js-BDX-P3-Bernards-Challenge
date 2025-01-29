import styles from "./Transmission.module.css";

const Transmission = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className={styles.transmission}>
      <hgroup>
        <h1 className={styles.transmission__title}>Diffusion</h1>
        <p className={styles.transmission__description}>
          Gestion des transmissions de données
        </p>
      </hgroup>

      <section className={`${styles.section} ${styles["section--enterprises"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Liste des Entreprises</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>Entreprise 1</option>
          <option>Entreprise 2</option>
          <option>Entreprise 3</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--channels"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Liste des Channels Slack</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>marketing</option>
          <option>dev</option>
          <option>sales</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--quiz"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Choix du Quiz</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>Quiz 1</option>
          <option>Quiz 2</option>
          <option>Quiz 3</option>
        </select>
      </section>

      {/* Encadrement du bouton avec une section */}
      <section className={`${styles.section} ${styles["section--send"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Envoyer sur Slack</h2>
        </hgroup>
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