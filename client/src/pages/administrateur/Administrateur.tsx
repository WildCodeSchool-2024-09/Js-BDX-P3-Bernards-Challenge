import { useState } from "react";
import styles from "./Administrateur.module.css";

const Administrateur = () => {
  const [message, setMessage] = useState(""); // ✅ Défini correctement

  const handleRevoke = (email: string) => {
    setMessage(`Les droits de ${email} ont été révoqués.`);
  };

  return (
    <section className={styles.administrateur}>
      <h1 className={styles.administrateur__title}>Gestion des Administrateurs</h1>
      <p className={styles.administrateur__description}>
        Consultez et modifiez les administrateurs existants.
      </p>

      {message && <p className={styles.administrateur__message}>{message}</p>}

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
            {[
              { firstName: "Geoffrey", email: "geoffrey@gmail.com" },
              { firstName: "Raph", email: "raph@gmail.com" },
            ].map((admin) => (
              <tr key={admin.email}>
                <td>{admin.firstName}</td>
                <td>{admin.email}</td>
                <td>
                  <button
                    type="button"
                    className={styles.administrateur__button}
                    onClick={() => handleRevoke(admin.email)}
                  >
                    Révoquer les droits
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className={styles.administrateur__sectionTitle}>
        Ajouter un nouvel administrateur
      </h2>

      <section className={styles.administrateur__addUser}>
        <form className={styles.administrateur__form}>
          <label htmlFor="firstname" className={styles.administrateur__label}>
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            className={styles.administrateur__input}
          />

          <label htmlFor="lastname" className={styles.administrateur__label}>
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            className={styles.administrateur__input}
          />

          <label htmlFor="email" className={styles.administrateur__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
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