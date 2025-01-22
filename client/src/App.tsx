import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/navbar/Navbar";
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