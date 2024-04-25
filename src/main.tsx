import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainPage from "./MainPage.tsx";
import PlayerSetup from "./PlayerSetup.tsx";
import GameStart from "./GameStart.tsx";
import PlayerPage from "./PlayerPage.tsx";
import GameplayPage from "./Gameplay.tsx";
import WinnerPage from "./WinnerPage.tsx";
import GuessWordPage from "./GuessWordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/setup",
    element: <PlayerSetup />,
  },
  {
    path: "/game",
    element: <GameStart />,
  },
  {
    path: "/player/:playerNumber",
    element: <PlayerPage />,
  },
  {
    path: "/gameplay",
    element: <GameplayPage />,
  },
  {
    path: "/winner",
    element: <WinnerPage />,
  },
  {
    path: "/guess-word",
    element: <GuessWordPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
