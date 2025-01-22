import styles from "./Result.module.css";

const Result = () => {
  return (
    <section className={styles.result}>
      <hgroup>
        <h1 className={styles.result__title}>Résultats</h1>
        <p className={styles.result__description}>Affichage des résultats des quizz</p>
      </hgroup>

      <section className={styles.result__section}>
        <hgroup>
          <h2 className={styles.section__title}>Filtres des résultats</h2>
        </hgroup>

        <form className={styles.result__form}>
          <section className={styles.result__dropdownRow}>
            <select className={styles.result__dropdown}>
              <option value="exemple1">Quizz - Drapeau</option>
              <option value="exemple2">Quizz - Dates</option>
              <option value="exemple3">Quizz - Autre</option>
            </select>
            <select className={styles.result__dropdown}>
              <option value="taux">Taux de participation</option>
              <option value="archive">Archive</option>
              <option value="autre">Autre</option>
            </select>
          </section>
        </form>
      </section>

      <section className={styles.result__section}>
        <hgroup>
          <h2 className={styles.section__title}>Classement</h2>
        </hgroup>
        <table className={styles.result__table}>
          <thead>
            <tr>
              <th>Classement</th>
              <th>Nom</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Geoffrey</td>
              <td>95</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Raph</td>
              <td>88</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Matthieu</td>
              <td>82</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Result;