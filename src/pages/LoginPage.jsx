import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../assets/globals.css";
import { GastosContext } from "../context/GastosContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { categoriesList, setUserLogged } = useContext(GastosContext);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState("error");
  const [message, setMessage] = useState(
    "Su correo electrónico y/o contraseña es incorrecto."
  );

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = () => {
    if (
      userCredentials.email.trim() !== "" &&
      userCredentials.password.trim() !== ""
    ) {
      const userFound = categoriesList.find(
        (element) =>
          element.email === userCredentials.email &&
          element.password === userCredentials.password
      );
      // console.log("🚀 ~ onSubmit ~ userFound:", userFound);
      // console.log("🚀 ~ LoginPage ~ userCredentials:", userCredentials);
      // console.log("🚀 ~ LoginPage ~ users:", categoriesList);

      if (userFound !== undefined) {
        console.log("🚀 ~ onSubmit ~ userFound:", userFound);
        setErrorState("success");
        setMessage("Iniciando sesión");
        setOpen(true);

        setUserLogged(userFound);
        navigate("/inicio");
      } else {
        setErrorState("error");
        setMessage("Su correo electrónico y/o contraseña es incorrecto.");
        setOpen(true);
      }
    } else {
      setErrorState("warning");
      setMessage("Todos los campos deben estar llenos.");
      setOpen(true);
    }
  };

  return (
    <>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={errorState}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
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
            onChange={(e) =>
              setUserCredentials({ ...userCredentials, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Contraseña"
            type="password"
            variant="outlined"
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
          />
          <button className="btn-primary" onClick={onSubmit}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </>
  );
};
