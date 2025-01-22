import styles from "./Administrateur.module.css";

const Administrateur = () => {
  return (
    <section className={styles.administrateur}>
      <hgroup>
        <h1 className={styles.administrateur__title}>Gestion des managers</h1>
        <p className={styles.administrateur__description}>Gérez les managers et leurs rôles</p>
      </hgroup>

      <section className={styles.administrateur__userManagement}>
        <hgroup>
          <h2 className={styles.administrateur__sectionTitle}>Liste des managers</h2>
          <p className={styles.administrateur__description}>
            Consultez et modifiez les informations des managers existants.
          </p>
        </hgroup>
        <table className={styles.administrateur__table}>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Geoffrey</td>
              <td>geoffrey@gmail.com</td>
              <td>Administrateur</td>
              <td>
                <button type="button" className={styles.administrateur__button}>Modifier</button>
              </td>
            </tr>
            <tr>
              <td>Raph</td>
              <td>raph@gmail.com</td>
              <td>Manager</td>
              <td>
                <button type="button" className={styles.administrateur__button}>Modifier</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.administrateur__addUser}>
        <hgroup>
          <h2 className={styles.administrateur__sectionTitle}>Ajouter un nouveau manager</h2>
          <p className={styles.administrateur__description}>
            Remplissez le formulaire ci-dessous pour ajouter un nouvel utilisateur.
          </p>
        </hgroup>
        <form className={styles.administrateur__form}>
          <label htmlFor="newManagerFirstName" className={styles.administrateur__label}>Prénom</label>
          <input
            type="text"
            id="newManagerFirstName"
            className={styles.administrateur__input}
            placeholder="Prénom"
          />

          <label htmlFor="newManagerName" className={styles.administrateur__label}>Nom</label>
          <input
            type="text"
            id="newManagerName"
            className={styles.administrateur__input}
            placeholder="Nom"
          />

          <label htmlFor="newManagerEmail" className={styles.administrateur__label}>Email</label>
          <input
            type="email"
            id="newManagerEmail"
            className={styles.administrateur__input}
            placeholder="Email"
          />

          <label htmlFor="newManagerRole" className={styles.administrateur__label}>Rôle</label>
          <select id="newManagerRole" className={styles.administrateur__input}>
            <option value="manager">Manager</option>
            <option value="administrateur">Administrateur</option>
          </select>

          <button type="submit" className={styles.administrateur__submitButton}>Ajouter</button>
        </form>
      </section>
    </section>
  );
};

export default Administrateur;