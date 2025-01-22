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

      <section className={`${styles.section} ${styles["section--channels"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Liste des Channels Slack</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>#general</option>
          <option>#random</option>
          <option>#team-project</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--players"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Liste des Joueurs</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>Joueur 1</option>
          <option>Joueur 2</option>
          <option>Joueur 3</option>
        </select>
      </section>

      <section className={`${styles.section} ${styles["section--teams"]}`}>
        <hgroup>
          <h2 className={styles.section__title}>Liste des Équipes</h2>
        </hgroup>
        <select className={styles.dropdown}>
          <option>Équipe Alpha</option>
          <option>Équipe Bravo</option>
          <option>Équipe Charlie</option>
        </select>
      </section>

      <button
        type="button"
        className={styles.transmission__slackButton}
        onClick={handleSubmit}
      >
        Envoyer sur Slack
      </button>
    </section>
  );
};

export default Transmission;