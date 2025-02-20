import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

type User = {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
};

type Auth = {
  user: User;
  token: string;
};

const App = () => {
  const [auth, setAuth] = useState<Auth | null>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth"); // Nettoie quand l'utilisateur se déconnecte
    }
  }, [auth]);
  return (
    <ThemeProvider>
      <Navbar />
      <main className="main-content">
        <Outlet context={{ auth, setAuth }} />
      </main>
    </ThemeProvider>
  );
};

export default App;
