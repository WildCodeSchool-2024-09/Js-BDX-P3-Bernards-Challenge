import styles from "./Enterprise.module.css";

const Enterprise = () => {
  return (
    <section className={styles.enterprise}>
      <h1 className={styles.enterprise__title}>Entreprise</h1>

      <section className={styles.enterprise__userManagement}>
        <table className={styles.enterprise__table}>
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Manager</th>
              <th>Channel Slack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Entreprise 1</td>
              <td>
                <select className={`${styles.enterprise__dropdowntop}`}>
                  <option value="Geoffrey">Geoffrey</option>
                  <option value="Raph">Raph</option>
                  <option value="Mathieu">Mathieu</option>
                </select>
              </td>
              <td>
              <select className={`${styles.enterprise__dropdowntop}`}>
                  <option value="marketing">marketing</option>
                  <option value="dev">dev</option>
                  <option value="sales">sales</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Entreprise 2</td>
              <td>
              <select className={`${styles.enterprise__dropdowntop}`}>
                  <option value="Geoffrey">Geoffrey</option>
                  <option value="Raph">Raph</option>
                  <option value="Mathieu">Mathieu</option>
                </select>
              </td>
              <td>
              <select className={`${styles.enterprise__dropdowntop}`}>
                  <option value="dev">dev</option>
                  <option value="marketing">marketing</option>
                  <option value="support">support</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.enterprise__addEnterprise}>
      <h2 className={styles.enterprise__sectionTitle}>Ajouter une nouvelle entreprise</h2>
        <form className={styles.enterprise__form}>
          <label htmlFor="newEnterpriseName" className={styles.enterprise__label}>
            Nom de l'entreprise
          </label>
          <input
            type="text"
            id="newEnterpriseName"
            className={styles.enterprise__input}
          />

          <label htmlFor="newEnterpriseToken" className={styles.enterprise__label}>
            Token Slack
          </label>
          <input
            type="text"
            id="newEnterpriseToken"
            className={styles.enterprise__input}
          />

          <button type="submit" className={styles.enterprise__submitButton}>
            Ajouter
          </button>
        </form>
      </section>

      <section className={styles.enterprise__addChannel}>
      <h2 className={styles.enterprise__sectionTitle}>Ajouter un nouveau channel</h2>
        <form className={styles.enterprise__form}>
          <label htmlFor="newChannelEnterprise" className={styles.enterprise__label}>
            Nom de l'entreprise
          </label>
          <select
            id="newChannelEnterprise"
            className={styles.enterprise__dropdown}
          >
            <option value="Entreprise 1">Entreprise 1</option>
            <option value="Entreprise 2">Entreprise 2</option>
          </select>

          <label htmlFor="newChannelId" className={styles.enterprise__label}>
            ID du Channel Slack
          </label>
          <input
            type="text"
            id="newChannelId"
            className={styles.enterprise__input}
          />

          <button type="submit" className={styles.enterprise__submitButton}>
            Ajouter le Channel
          </button>
        </form>
      </section>
    </section>
  );
};

export default Enterprise;