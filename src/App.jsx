import "./App.css";
import DashboardLayout from "./DashboardLayout";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Comparison from "./pages/Comparison";
import NotFound from "./NotFound";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/player-stats",
          element: <Player />,
        },
        {
          path: "/players-comparison",
          element: <Comparison />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
