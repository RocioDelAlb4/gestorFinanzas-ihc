import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./layout/MainLayout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { GastosProvider } from "./context/GastosContext.jsx";

const routerReact = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GastosProvider>
      <RouterProvider router={routerReact} />
    </GastosProvider>
  </React.StrictMode>
);
