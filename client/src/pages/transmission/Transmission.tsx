import { useEffect, useState } from "react";
import styles from "./Transmission.module.css";

const Transmission = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString().slice(0, 16);
    setCurrentDateTime(isoString);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles.transmission} onSubmit={handleSubmit}>
      <h1 className={styles.transmission__title}>Diffusion</h1>

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

      <button
        type="submit"
        className={styles.transmission__slackButton}
      >
        Envoyer sur Slack
      </button>

      <section className={`${styles.section} ${styles["section--datetime"]}`}>
        <h2 className={styles.section__title}>Choisir la Date et l'Heure</h2>
        <input
          type="datetime-local"
          className={styles.datetimeInput}
          value={currentDateTime}
          onChange={(e) => setCurrentDateTime(e.target.value)}
        />
      </section>

      <button
        type="button"
        className={styles.transmission__slackButton}
      >
        Envoyer en Différé
      </button>
    </form>
  );
};

export default Transmission;