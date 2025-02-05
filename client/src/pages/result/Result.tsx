import styles from "./Result.module.css";

const Result = () => {
  return (
    <section className={styles.result}>
      <h1 className={styles.result__title}>Résultats</h1>

      <section className={styles.result__section}>
        <h2 className={styles.section__title}>Filtres des résultats</h2>
        <form className={styles.result__form}>
          <fieldset className={styles.result__dropdownRow}>
            <select className={styles.result__dropdown}>
              <option value="select">Entreprise</option>
              <option value="exemple">Entreprise 1</option>
              <option value="exemple2">Entreprise 2</option>
            </select>
            <select className={styles.result__dropdown}>
              <option value="select">Channel</option>
              <option value="exemple">Marketing</option>
              <option value="exemple2">Dev</option>
            </select>
            <select className={styles.result__dropdown}>
              <option value="select">Quizz</option>
              <option value="exemple">Quizz 2</option>
              <option value="exemple2">Quizz 3</option>
            </select>
            <select className={styles.result__dropdown}>
              <option value="select">Questions</option>
              <option value="q1">Question 1</option>
              <option value="q2">Question 2</option>
              <option value="q3">Question 3</option>
            </select>
          </fieldset>
        </form>
      </section>

      <section className={styles.result__section}>
        <h2 className={styles.section__title}>Résultats</h2>

        <table className={styles.result__table}>
          <thead>
            <tr>
              <th>Équipe</th>
              <th>Réponse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Team A</td>
              <td>Réponse</td>
            </tr>
            <tr>
              <td>Team B</td>
              <td>Réponse</td>
            </tr>
            <tr>
              <td>Team C</td>
              <td>Réponse</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Result;
