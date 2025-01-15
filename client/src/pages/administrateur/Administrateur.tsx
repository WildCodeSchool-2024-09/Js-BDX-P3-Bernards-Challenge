import styles from "./Administrateur.module.css";

const Administrateur = () => {
  return (
    <section className={styles.administrateur}>
      <h1 className={styles.administrateur__title}>Administrateur</h1>
      <p className={styles.administrateur__description}>Gérez vos tâches sur Slack</p>
    </section>
  );
};

export default Administrateur;