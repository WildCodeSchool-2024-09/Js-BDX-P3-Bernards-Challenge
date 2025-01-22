import styles from "./Quizz.module.css";

const Quizz = () => {
  return (
    <section className={styles.quizz}>
      <hgroup>
        <h1 className={styles.quizz__title}>Quizz</h1>
        <p className={styles.quizz__description}>Gestion des quizz</p>
      </hgroup>

      <section className={styles.quizz__section}>
        <hgroup>
          <h2 className={styles.section__title}>Créer ou Sélectionner un Quizz</h2>
        </hgroup>

        <form className={styles.quizz__form}>
          <select className={styles.quizz__dropdown}>
            <option>Créer un nouveau Quizz</option>
            <option>Quizz à choix multiples</option>
            <option>Quizz vrai/faux</option>
          </select>

          <select className={styles.quizz__dropdown}>
            <option>Quiz existants</option>
            <option>Quiz 1</option>
            <option>Quiz 2</option>
          </select>

          <textarea
            className={styles.quizz__textarea}
            placeholder="Écrivez votre question ici"
          />

          <input
            type="file"
            accept="image/*,video/*,audio/*"
            className={styles.quizz__dropdown}
            aria-label="Ajouter du contenu multimédia"
          />

          <input
            type="text"
            placeholder="Réponse 1"
            className={styles.quizz__answer}
          />
          <input
            type="text"
            placeholder="Réponse 2"
            className={styles.quizz__answer}
          />

          <input
            type="text"
            placeholder="Réponse 3"
            className={styles.quizz__answer}
          />
          <input
            type="text"
            placeholder="Réponse 4"
            className={styles.quizz__answer}
          />

          <button type="button" className={styles.quizz__createButton}>
            Créer le Quizz
          </button>

          <button type="button" className={styles.quizz__button}>
            Ajouter une Question
          </button>
        </form>
      </section>
    </section>
  );
};

export default Quizz;