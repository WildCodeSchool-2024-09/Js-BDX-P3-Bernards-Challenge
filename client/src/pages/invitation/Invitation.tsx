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
    <section className={styles.administrateur}>
      <hgroup>
        <h1 className={styles.administrateur__title}>Inviter un Manager</h1>
        <p className={styles.administrateur__description}>
          Remplissez les informations ci-dessous pour inviter un manager.
        </p>
      </hgroup>

      <section className={styles.administrateur__addUser}>
        <hgroup>
          <h2 className={styles.administrateur__sectionTitle}>Informations sur le Manager</h2>
        </hgroup>
        <form className={styles.administrateur__form}>
          <label htmlFor="invitationFirstName" className={styles.administrateur__label}>
            Prénom
          </label>
          <input
            type="text"
            id="invitationFirstName"
            className={styles.administrateur__input}
            placeholder="Prénom"
          />

          <label htmlFor="invitationLastName" className={styles.administrateur__label}>
            Nom
          </label>
          <input
            type="text"
            id="invitationLastName"
            className={styles.administrateur__input}
            placeholder="Nom"
          />

          <label htmlFor="invitationCompany" className={styles.administrateur__label}>
            Entreprise
          </label>
          <select id="invitationCompany" className={styles.administrateur__input}>
            <option value="company1">Entreprise 1</option>
            <option value="company2">Entreprise 2</option>
            <option value="company3">Entreprise 3</option>
          </select>

          <label htmlFor="invitationSlackChannel" className={styles.administrateur__label}>
            Channel Slack
          </label>
          <select id="invitationSlackChannel" className={styles.administrateur__input}>
            <option value="#general">#general</option>
            <option value="#random">#random</option>
            <option value="#team-project">#team-project</option>
          </select>

          <label htmlFor="invitationEmail" className={styles.administrateur__label}>
            Email
          </label>
          <input
            type="email"
            id="invitationEmail"
            className={styles.administrateur__input}
            placeholder="Email"
          />

          <label htmlFor="invitationPassword" className={styles.administrateur__label}>
            Mot de passe
          </label>
          <input
            type="text"
            id="invitationPassword"
            className={styles.administrateur__input}
            value={password}
            readOnly
          />
          <button
            type="button"
            onClick={generatePassword}
            className={styles.administrateur__button}
          >
            Générer Mot de passe
          </button>

          <button type="submit" className={styles.administrateur__submitButton}>
            Inviter
          </button>
        </form>
      </section>
    </section>
  );
};

export default Invitation;