import type { FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./Profil.module.css";

import { useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type Auth = {
  user: User;
  token: string;
};

const Profil = () => {

  const { auth, setAuth } = useOutletContext<{ auth: Auth | null, setAuth: (auth: Auth) => void }>();

  const [hasFetched, setHasFetched] = useState(false); // État local pour vérifier si le fetch a été effectué

  useEffect(() => {
    // Si auth est défini et qu'on n'a pas déjà effectué le fetch
    if (auth && !hasFetched) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/managers/${auth?.user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Problème lors de la récupération des données utilisateur");
          }

          // const responseAdmin = await fetch(`${import.meta.env.VITE_API_URL}/api/admins/${auth?.user.id}`, {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${auth.token}`,
          //   },
          // });

          // if (!responseAdmin.ok) {
          //   throw new Error("Problème lors de la récupération des données utilisateur");
          // }

          const userData = await response.json();
          // const userDataAdmin = await responseAdmin.json();
          // console.log("userDataAdmin", userDataAdmin);
          setAuth({
            token: auth.token,
            // user: userData || userDataAdmin,
            user: userData
          });
          setHasFetched(true); // On marque le fetch comme effectué
        } catch (error) {
          console.error("Erreur lors du fetch des données utilisateur :", error);
        }
      };

      fetchUser();
    }
  }, [auth, hasFetched, setAuth]);

  const verificationPassword = async (password: string) => {

    // Vérification du mot de passe
    try {
      // Appel à l'API pour demander une connexion`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/checkPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth?.token}` },
          body: JSON.stringify({
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password:
              /* rendering process ensures the ref is defined before the form is submitted */
              password,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        return true;

      }
      return false;
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  const first_nameRef = useRef<HTMLInputElement>(null);
  const last_nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    if (await verificationPassword((oldPasswordRef.current as HTMLInputElement).value) && auth) {

      try {
        // Appel à l'API pour demander une connexion`
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/managers/${auth?.user.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth?.token}` },
            body: JSON.stringify({
              last_name:
                /* rendering process ensures the ref is defined before the form is submitted */
                (last_nameRef.current as HTMLInputElement).value,
              first_name:
                /* rendering process ensures the ref is defined before the form is submitted */
                (first_nameRef.current as HTMLInputElement).value,
              email:
                /* rendering process ensures the ref is defined before the form is submitted */
                (emailRef.current as HTMLInputElement).value,
              password:
                /* rendering process ensures the ref is defined before the form is submitted */
                (newPasswordRef.current as HTMLInputElement).value,
            }),
          },
        );

        // Redirection vers la page de connexion si la création réussit
        if (response.status === 204) {
          alert("votre mot de passe a bien etait changé")
          const user = {
            last_name:
              /* rendering process ensures the ref is defined before the form is submitted */
              (last_nameRef.current as HTMLInputElement).value,
            first_name:
              /* rendering process ensures the ref is defined before the form is submitted */
              (first_nameRef.current as HTMLInputElement).value,
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            id:
              auth?.user.id
          }

          setAuth(
            { token: auth?.token, user: user }
          );

          // navigate("/profil");
        } else {
          // Log des détails de la réponse en cas d'échec
          alert(response);
        }
      } catch (err) {
        // Log des erreurs possibles
        alert(err);
      }
    }
  }

  return (
    <section className={styles.profil}>
      <h1 className={styles.profil__title}>Profil</h1>

      <section className={styles.profil__formSection}>
        <h2 className={styles.profil__sectionTitle}>Modifier mon profil</h2>

        <form className={styles.profil__form} onSubmit={handleSubmit}>
          <label htmlFor="firstName" className={styles.profil__label}>
            Prénom
          </label>
          <input type="text" id="firstName" className={styles.profil__input} value={auth?.user.first_name} ref={first_nameRef} />

          <label htmlFor="lastName" className={styles.profil__label}>
            Nom
          </label>
          <input type="text" id="lastName" className={styles.profil__input} value={auth?.user.last_name} ref={last_nameRef} />

          <label htmlFor="email" className={styles.profil__label}>
            Email
          </label>
          <input type="email" id="email" className={styles.profil__input} value={auth?.user.email} ref={emailRef} />

          <label htmlFor="password" className={styles.profil__label}>
            Ancien mot de passe
          </label>
          <input
            type="password"
            id="password"
            className={styles.profil__input}
            ref={oldPasswordRef}
          />

          <label htmlFor="newPassword" className={styles.profil__label}>
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            className={styles.profil__input}
            ref={newPasswordRef}
          />

          <button type="submit" className={styles.profil__submitButton}>
            Sauvegarder
          </button>
        </form>
      </section>
    </section>
  );
};

export default Profil;
