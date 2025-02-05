import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </ThemeProvider>
  );
};

export default App;
