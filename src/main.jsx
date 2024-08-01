import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./layout/MainLayout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";

const routerReact = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerReact} />
  </React.StrictMode>
);
