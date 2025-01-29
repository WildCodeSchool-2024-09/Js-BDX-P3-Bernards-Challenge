import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Administrateur from "./pages/administrateur/Administrateur";
import Profil from "./pages/profil/Profil";
import Quizz from "./pages/quizz/Quizz";
import Result from "./pages/result/Result";
import Transmission from "./pages/transmission/Transmission";
import Invitation from "./pages/invitation/Invitation";
import Enterprise from "./pages/enterprise/Enterprise";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/administrateur", element: <Administrateur /> },
      { path: "/entreprise", element: <Enterprise /> },
      { path: "/profil", element: <Profil /> },
      { path: "/quizz", element: <Quizz /> },
      { path: "/result", element: <Result /> },
      { path: "/transmission", element: <Transmission /> },
      { path: "/invitation", element: <Invitation /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Votre document HTML doit contenir un <div id='root'></div>");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);