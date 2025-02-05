import { useState } from "react";
import styles from "./Administrator.module.css";

const Administrator = () => {
  const [message, setMessage] = useState("");

  const handleRevoke = (email: string) => {
    setMessage(`Les droits de ${email} ont été révoqués.`);
  };

  return (
    <section className={styles.administrator__container}>
      <h1 className={styles.administrator__header}>Administrateurs</h1>

      {message && (
        <p className={styles.administrator__statusMessage}>{message}</p>
      )}

      <section className={styles.administrator__userList}>
        <table className={styles.administrator__tableContainer}>
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
                    className={styles.administrator__revokeButton}
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

      <section className={styles.administrator__addUserSection}>
        <h2 className={styles.administrator__addSectionTitle}>
          Ajouter un nouvel administrateur
        </h2>
        <form className={styles.administrator__addForm}>
          <label
            htmlFor="firstname"
            className={styles.administrator__inputLabel}
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            className={styles.administrator__inputField}
          />

          <label
            htmlFor="lastname"
            className={styles.administrator__inputLabel}
          >
            Nom de famille
          </label>
          <input
            type="text"
            id="lastname"
            className={styles.administrator__inputField}
          />

          <label htmlFor="email" className={styles.administrator__inputLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.administrator__inputField}
          />

          <label
            htmlFor="superAdmin"
            className={styles.administrator__inputLabel}
          >
            Super Administrateur
          </label>
          <select id="superAdmin" className={styles.administrator__select}>
            <option value="no">Non</option>
            <option value="yes">Oui</option>
          </select>

          <button type="submit" className={styles.administrator__submitButton}>
            Ajouter
          </button>
        </form>
      </section>
    </section>
  );
};

export default Administrator;
