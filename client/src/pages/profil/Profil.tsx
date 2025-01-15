import styles from "./Profil.module.css";

const Profil = () => {
  return (
    <section className={styles.profil}>
      <h1 className={styles.profil__title}>Profil</h1>
      <p className={styles.profil__description}>Gestion de votre profil</p>
    </section>
  );
};

export default Profil;