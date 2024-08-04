import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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
  categoriesList,
  setCategoryList,
  initial,
}) => {
  const [showError, setShowError] = useState(false);

  const [data, setData] = useState({ name: "", price: 0, category: "" });

  const [categorySelected, setCategorySelected] = useState("");
  const handleChange = (event) => {
    setCategorySelected(event.target.value);
    setData({ ...data, category: event.target.value });
  };

  const onSubmit = () => {
    // const found = categoriesList.find(
    //   (element) => element.name.toLowerCase() === data.name.toLowerCase()
    // );
    // console.log("🚀 ~ onSubmit ~ found:", found);
    // if (found !== undefined) {
    //   setShowError(true);
    // } else {
    // }
    // const newData = [
    //   ...categoriesList,
    //   { name: data.name, price: data.price, category: data.category },
    // ];
    // setCategoryList(newData);
    if (
      data.name.trim() !== "" &&
      data.price !== 0 &&
      data.category.trim() !== ""
    ) {
      const categoryFound = categoriesList.find(
        (element) => element.name === data.category
      );

      if (categoryFound) {
        const newValue = categoryFound.value + (data.price * 100) / initial;
        const newPercent = categoryFound.percent + parseFloat(data.price);

        const updatedCategory = {
          ...categoryFound,
          value: newValue,
          percent: newPercent,
        };

        const newList = categoriesList.filter(
          (element) => element.name !== data.category
        );

        setCategoryList([...newList, updatedCategory]);
        setData({ name: "", price: 0, category: "" });
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <>
      <div className="header-page">
        {showError && <div>ya registrado</div>}
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
                {categoriesList.map((element, index) => (
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
