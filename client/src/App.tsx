import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";
import { useState } from "react";
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
// const [auth, setAuth] = useState(null as Auth | null);
/* <nav>
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  {auth == null ? (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  ) : (
    <li>
      <button
        type="button"
        onClick={() => {
          setAuth(null);
        }}
      >
        Logout
      </button>
    </li>
  )}
</ul>
</nav> */
// {auth && <p>Hello {auth.user.email}</p>}
// <main>
// <Outlet context={{ auth, setAuth }} />
// </main>
// </>
const App = () => {
  const [auth, setAuth] = useState(null as Auth | null);
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
