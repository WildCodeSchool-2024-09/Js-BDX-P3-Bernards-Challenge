import { useState } from "react";
import styles from "./Administrator.module.css";

const Administrator = () => {
  const [message, setMessage] = useState("");

  const handleRevoke = (email: string) => {
    setMessage(`The rights of ${email} have been revoked.`);
  };

  return (
    <section className={styles.administrator}>
      <h1 className={styles.administrator__title}>Administrator Management</h1>
      <p className={styles.administrator__description}>
        View and edit existing administrators.
      </p>

      {message && <p className={styles.administrator__message}>{message}</p>}

      <section className={styles.administrator__userManagement}>
        <table className={styles.administrator__table}>
          <thead>
            <tr>
              <th>First Name</th>
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
                    className={styles.administrator__button}
                    onClick={() => handleRevoke(admin.email)}
                  >
                    Revoke Rights
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className={styles.administrator__sectionTitle}>
        Add a New Administrator
      </h2>

      <section className={styles.administrator__addUser}>
        <form className={styles.administrator__form}>
          <label htmlFor="firstname" className={styles.administrator__label}>
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className={styles.administrator__input}
          />

          <label htmlFor="lastname" className={styles.administrator__label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className={styles.administrator__input}
          />

          <label htmlFor="email" className={styles.administrator__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.administrator__input}
          />

          <button type="submit" className={styles.administrator__submitButton}>
            Add
          </button>
        </form>
      </section>
    </section>
  );
};

export default Administrator;