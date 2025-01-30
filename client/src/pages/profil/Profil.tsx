import styles from "./Profil.module.css";

const Profil = () => {
  return (
    <section className={styles.profil}>
      <h1 className={styles.profil__title}>Profil</h1>
      <p className={styles.profil__description}>Gestion de votre profil</p>

      <section className={styles.profil__formSection}>
        <h2 className={styles.profil__sectionTitle}>Modifier mon profil</h2>

        <form className={styles.profil__form}>
          <label htmlFor="firstName" className={styles.profil__label}>Prénom</label>
          <input
            type="text"
            id="firstName"
            className={styles.profil__input}
          />

          <label htmlFor="lastName" className={styles.profil__label}>Nom</label>
          <input
            type="text"
            id="lastName"
            className={styles.profil__input}
          />

          <label htmlFor="email" className={styles.profil__label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.profil__input}
          />

          <label htmlFor="password" className={styles.profil__label}>Mot de passe</label>
          <input
            type="password"
            id="password"
            className={styles.profil__input}
          />

          <button type="submit" className={styles.profil__submitButton}>Sauvegarder</button>
        </form>
      </section>
    </section>
  );
};

export default Profil;