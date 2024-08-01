// router.jsx
import React, { Children } from "react";
import MainLayout from "../layout/MainLayout.jsx"; // Asegúrate de que la ruta es correcta
import App from "../App.jsx";
import {
  AdvicesPage,
  CategoriesPage,
  HomePage,
  ReportsPage,
  SavingsPlanPage,
} from "../pages/index.jsx";

const router = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: "/inicio",
        element: <HomePage />,
      },
      {
        path: "/planDeAhorro",
        element: <SavingsPlanPage />,
      },
      {
        path: "/categorias",
        element: <CategoriesPage />,
      },
      {
        path: "/reportes",
        element: <ReportsPage />,
      },
      {
        path: "/consejos",
        element: <AdvicesPage />,
      },
    ],
  },
];

export { router };
