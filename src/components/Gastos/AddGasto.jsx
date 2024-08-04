import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./styles.css";

// const categoriesList = [
//   { name: "Alimentacion", color: "#A5F279" },
//   { name: "Transporte", color: "#966FD6" },
//   { name: "Estudios", color: "#779ECB" },
// ];

export const AddGasto = ({
  onClose,
  children,
  categories,
  userLogged,
  setUserLogged,
  initial,
}) => {
  const [showError, setShowError] = useState(false);

  const [data, setData] = useState({ name: "", price: 0, category: "" });

  const [categorySelected, setCategorySelected] = useState("");

  const [errorState, setErrorState] = useState("success");
  const [message, setMessage] = useState(
    "Se ha agregado el gasto exitosamente."
  );

  const handleChange = (event) => {
    setCategorySelected(event.target.value);
    setData({ ...data, category: event.target.value });
  };

  const [open, setOpen] = React.useState(false);

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
      data.name.trim() !== "" &&
      data.price !== 0 &&
      categorySelected.trim() !== ""
    ) {
      const categoryFound = userLogged.categoriesList.find(
        (element) => element.name === data.category
      );

      if (categoryFound !== undefined) {
        const newValue = categoryFound.value + (data.price * 100) / initial;
        const newPercent = categoryFound.percent + parseFloat(data.price);

        const updatedCategory = {
          ...categoryFound,
          value: newValue,
          percent: newPercent,
        };

        const newList = userLogged.categoriesList.filter(
          (element) => element.name !== data.category
        );

        const actualUser = {
          ...userLogged,
          categoriesList: [...newList, updatedCategory],
        };

        setErrorState("success");
        setMessage("Se ha agregado el gasto");
        setOpen(true);

        setUserLogged(actualUser);
        setData({ name: "", price: 0, category: "" });
        setCategorySelected("");
      } else {
        setErrorState("error");
        setMessage("Algo salió mal, por favor inténtalo otra vez. ");
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
      <div className="header-page">
        <button className="btn-back" onClick={onClose}>
          <ArrowBackIcon fontSize="large" />
        </button>
        <h1 className="h1-mod">Agregar gasto</h1>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 2,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="form-container">
            <div className="input-label">
              <p className="thin-text"> Nombre:</p>
              <TextField
                id="outlined-basic"
                label="Nombre del gasto"
                variant="outlined"
                value={data.name}
                error={false}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="input-label">
              <p className="thin-text"> Precio:</p>
              <TextField
                id="outlined-basic"
                label="Precio"
                variant="outlined"
                type="number"
                value={data.price}
                error={false}
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div className="input-label">
              <p className="thin-text"> Categoria:</p>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ minWidth: "15em" }}
                value={categorySelected}
                label="Categoria"
                onChange={handleChange}
              >
                {userLogged.categoriesList.map((element, index) => (
                  <MenuItem
                    key={index}
                    value={element.name}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FiberManualRecordIcon sx={{ color: element.color }} />
                    {element.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </Box>
      </div>
      <div className="form-container" style={{ marginTop: "2.5em" }}>
        <button className="btn-primary" onClick={onSubmit}>
          Agregar
        </button>
      </div>
    </>
  );
};
