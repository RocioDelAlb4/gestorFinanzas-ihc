import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../assets/globals.css";

export const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        alignItems: "center",
      }}
    >
      <div className="form-style">
        <h1 className="h1-mod">Inicio de Sesión</h1>
        <TextField
          id="outlined-basic"
          label="Correo electrónico"
          type="email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Contraseña"
          type="password"
          variant="outlined"
        />
        <button className="btn-primary">Iniciar sesión</button>
      </div>
    </div>
  );
};
