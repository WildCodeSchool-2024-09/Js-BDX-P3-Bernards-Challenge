import styles from "./Quizz.module.css";

const Quizz = () => {
  return (
    <section className={styles.quizz}>
      <h1 className={styles.quizz__title}>Quizz</h1>
      <section className={styles.quizz__section}>
        <h2 className={styles.section__title}>
          Créer ou Sélectionner un Quizz
        </h2>
        <form className={styles.quizz__form}>
          <label htmlFor="quizType" className={styles.quizz__label}>
            Type de Quizz
          </label>
          <select id="quizType" className={styles.quizz__dropdown}>
            <option>Créer un nouveau Quizz</option>
            <option>Quizz à choix multiples</option>
            <option>Quizz vrai/faux</option>
          </select>

          <label htmlFor="existingQuiz" className={styles.quizz__label}>
            Quiz existants
          </label>
          <select id="existingQuiz" className={styles.quizz__dropdown}>
            <option>Quiz existants</option>
            <option>Quiz 1</option>
            <option>Quiz 2</option>
          </select>

          <label htmlFor="quizTitle" className={styles.quizz__label}>
            Titre du Quizz
          </label>
          <input
            type="text"
            id="quizTitle"
            className={styles.quizz__titleInput}
          />

          <label htmlFor="questionTitle" className={styles.quizz__label}>
            Titre de la Question
          </label>
          <input
            type="text"
            id="questionTitle"
            className={styles.quizz__questionTitleInput}
          />

          <label htmlFor="answer1" className={styles.quizz__label}>
            Réponse 1
          </label>
          <input type="text" id="answer1" className={styles.quizz__answer} />

          <label htmlFor="answer2" className={styles.quizz__label}>
            Réponse 2
          </label>
          <input type="text" id="answer2" className={styles.quizz__answer} />

          <label htmlFor="answer3" className={styles.quizz__label}>
            Réponse 3
          </label>
          <input type="text" id="answer3" className={styles.quizz__answer} />

          <label htmlFor="answer4" className={styles.quizz__label}>
            Réponse 4
          </label>
          <input type="text" id="answer4" className={styles.quizz__answer} />

          <fieldset className={styles.quizz__validateRow}>
            <button type="button" className={styles.quizz__validateButton}>
              Valider
            </button>
          </fieldset>

          <fieldset className={styles.quizz__buttonsRow}>
            <button type="button" className={styles.quizz__button}>
              Ajouter une Question
            </button>
            <button type="button" className={styles.quizz__deleteButton}>
              Supprimer Question
            </button>
          </fieldset>

          <fieldset className={styles.quizz__buttonsRow}>
            <button type="button" className={styles.quizz__createButton}>
              Créer le Quizz
            </button>
            <button type="button" className={styles.quizz__deleteQuizButton}>
              Supprimer Quizz
            </button>
          </fieldset>
        </form>
      </section>
    </section>
  );
};

export default Quizz;
