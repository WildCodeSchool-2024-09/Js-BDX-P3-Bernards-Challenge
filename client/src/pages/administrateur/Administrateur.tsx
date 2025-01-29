import styles from "./Administrateur.module.css";

const Administrateur = () => {
  return (
    <section className={styles.administrateur}>
      <hgroup>
        <h1 className={styles.administrateur__title}>Gestion des Administrateurs</h1>
        <p className={styles.administrateur__description}>Consultez et modifiez les administrateurs existants.</p>
      </hgroup>
      <section className={styles.administrateur__userManagement}>
        <table className={styles.administrateur__table}>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Geoffrey</td>
              <td>geoffrey@gmail.com</td>
              <td>
                <button type="button" className={styles.administrateur__button}>
                  Révoquer les droits
                </button>
              </td>
            </tr>
            <tr>
              <td>Raph</td>
              <td>raph@gmail.com</td>
              <td>
                <button type="button" className={styles.administrateur__button}>
                  Révoquer les droits
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <hgroup>
        <h2 className={styles.administrateur__sectionTitle}>Ajouter un nouveau administrateur</h2>
      </hgroup>
      <section className={styles.administrateur__addUser}>
        <form className={styles.administrateur__form}>
          <label htmlFor="newManagerFirstName" className={styles.administrateur__label}>
            Prénom
          </label>
          <input
            type="text"
            id="newManagerFirstName"
            className={styles.administrateur__input}
          />

          <label htmlFor="newManagerName" className={styles.administrateur__label}>
            Nom
          </label>
          <input
            type="text"
            id="newManagerName"
            className={styles.administrateur__input}
          />

          <label htmlFor="newManagerEmail" className={styles.administrateur__label}>
            Email
          </label>
          <input
            type="email"
            id="newManagerEmail"
            className={styles.administrateur__input}
          />

          <button type="submit" className={styles.administrateur__submitButton}>
            Ajouter
          </button>
        </form>
      </section>
    </section>
  );
};

export default Administrateur;