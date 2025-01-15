import styles from "./Quizz.module.css";

const Quizz = () => {
  return (
    <section className={styles.quizz}>
      <h1 className={styles.quizz__title}>Quizz</h1>
      <p className={styles.quizz__description}>Gestion des quizz</p>
    </section>
  );
};

export default Quizz;