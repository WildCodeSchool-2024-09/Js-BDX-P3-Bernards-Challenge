import styles from "./Transmission.module.css";

const Transmission = () => {
  return (
    <section className={styles.transmission}>
      <h1 className={styles.transmission__title}>Diffusion</h1>
      <p className={styles.transmission__description}>Gestion des transmissions de données</p>
    </section>
  );
};

export default Transmission;