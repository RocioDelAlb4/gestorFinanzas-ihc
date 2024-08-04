import React, { useContext } from "react";
import MultiProgress from "react-multi-progress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../assets/globals.css";
import "./styles/index.css";
import { GastosContext } from "../context/GastosContext";
// const list = [
//   {
//     value: (200 * 100) / 500,
//     color: "#A5F279",
//     percent: 200,
//     name: "Alimentacion",
//   },
//   {
//     value: (20 * 100) / 500,
//     color: "#966FD6",
//     percent: 20,
//     name: "Transporte",
//   },
//   {
//     value: (100 * 100) / 500,
//     color: "#779ECB",
//     percent: 100,
//     name: "Estudios",
//   },
// ];

// const initial = 500;

export const ReportsPage = () => {
  const { userLogged } = useContext(GastosContext);

  return (
    <div className="container">
      <div className="header-page">
        <h1 className="h1-mod">Reportes de hoy</h1>
        <p className="thin-text">Limite diario: {userLogged.dailyLimit} Bs.</p>
      </div>

      <div className="reports-bar">
        {userLogged.categoriesList.map((element, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1em",
            }}
          >
            <p className="thin-text">
              {element.name}: {element.percent} Bs. gastado
            </p>
            <MultiProgress
              className="progress-bar"
              elements={[element]}
              height={81}
              backgroundColor="#D9D9D9"
              roundLastElement={false}
              round={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
