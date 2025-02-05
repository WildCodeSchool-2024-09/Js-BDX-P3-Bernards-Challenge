import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Administrator from "./pages/administrator/Administrator";
import Enterprise from "./pages/enterprise/Enterprise";
import Home from "./pages/home/Home";
import Invitation from "./pages/invitation/Invitation";
import Profil from "./pages/profil/Profil";
import Quizz from "./pages/quizz/Quizz";
import Result from "./pages/result/Result";
import Transmission from "./pages/transmission/Transmission";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/administrator", element: <Administrator /> },
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
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
