import { useState } from "react";
import styles from "./Invitation.module.css";

const Invitation = () => {
  const [password, setPassword] = useState<string>("");

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <section className={styles.admin}>
      <h1 className={styles.admin__title}>Inviter un Manager</h1>
      <p className={styles.admin__description}>
        Remplissez les informations ci-dessous pour inviter un manager.
      </p>

      <section className={styles.admin__addUser}>
        <h2 className={styles.admin__sectionTitle}>Informations sur le Manager</h2>

        <form className={styles.admin__form}>
          <label htmlFor="invitationFirstName" className={styles.admin__label}>
            Prénom
          </label>
          <input
            type="text"
            id="invitationFirstName"
            className={styles.admin__input}
          />

          <label htmlFor="invitationLastName" className={styles.admin__label}>
            Nom
          </label>
          <input
            type="text"
            id="invitationLastName"
            className={styles.admin__input}
          />

          <label htmlFor="invitationCompany" className={styles.admin__label}>
            Entreprise
          </label>
          <select id="invitationCompany" className={styles.admin__input}>
            <option value="company1">Entreprise 1</option>
            <option value="company2">Entreprise 2</option>
            <option value="company3">Entreprise 3</option>
          </select>

          <label htmlFor="invitationSlackChannel" className={styles.admin__label}>
            Channel Slack
          </label>
          <select id="invitationSlackChannel" className={styles.admin__input}>
            <option value="#general">#marketing</option>
            <option value="#random">#dev</option>
            <option value="#team-project">#sales</option>
          </select>

          <label htmlFor="invitationEmail" className={styles.admin__label}>
            Email
          </label>
          <input
            type="email"
            id="invitationEmail"
            className={styles.admin__input}
          />

          <label htmlFor="invitationPassword" className={styles.admin__label}>
            Mot de passe
          </label>
          <input
            type="text"
            id="invitationPassword"
            className={styles.admin__input}
            value={password}
            readOnly
          />
          <button
            type="button"
            onClick={generatePassword}
            className={`${styles.admin__button} ${styles.admin__generateButton}`}
          >
            Générer un mot de passe
          </button>

          <button type="submit" className={styles.admin__submitButton}>
            Inviter
          </button>
        </form>
      </section>
    </section>
  );
};

export default Invitation;