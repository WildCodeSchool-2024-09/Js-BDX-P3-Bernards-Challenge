import styles from "./Result.module.css";

const Result = () => {
  return (
    <section className={styles.result}>
      <h1 className={styles.result__title}>Résultats</h1>
      <p className={styles.result__description}>Affichage des résultats des quizz</p>
    </section>
  );
};

export default Result;