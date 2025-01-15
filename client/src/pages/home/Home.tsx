import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>Bernard's Challenges</h1>
      <p className={styles.home__description}>Rejoignez-nous sur Slack</p>
    </section>
  );
};

export default Home;