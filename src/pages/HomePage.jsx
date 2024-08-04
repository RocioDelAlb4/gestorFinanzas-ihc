import React, { useContext, useEffect, useState } from "react";
import MultiProgress from "react-multi-progress";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./styles/index.css";
import "../assets/globals.css";
import { AddGasto } from "../components/Gastos/AddGasto";
import { GastosContext } from "../context/GastosContext";

const list = [
  {
    value: 0,
    color: "#A5F279",
    percent: 0,
    name: "Alimentacion",
  },
  {
    value: 0,
    color: "#966FD6",
    percent: 0,
    name: "Transporte",
  },
  {
    value: 0,
    color: "#779ECB",
    percent: 0,
    name: "Estudios",
  },
];

// limit 8: alimentacion, transporte, estudios, entretenimiento, emergencias.

const initial = 500;

export const HomePage = () => {
  const [totalPercent, setTotalPercent] = useState(0);
  const [total, setTotal] = useState(0);

  const [showAddGasto, setShowAddGasto] = useState(false);

  const { categoriesList, setCategoryList, initial } =
    useContext(GastosContext);

  // const [categoriesList, setCategoryList] = useState([
  //   {
  //     value: 0,
  //     color: "#A5F279",
  //     percent: 0,
  //     name: "Alimentacion",
  //   },
  //   {
  //     value: 0,
  //     color: "#966FD6",
  //     percent: 0,
  //     name: "Transporte",
  //   },
  //   {
  //     value: 0,
  //     color: "#779ECB",
  //     percent: 0,
  //     name: "Estudios",
  //   },
  // ]);

  useEffect(() => {
    const totalAux = categoriesList.reduce(
      (accumulator, item) => accumulator + item.percent,
      0
    );

    setTotalPercent((totalAux * 100) / initial);
    setTotal(totalAux);
  }, [categoriesList]);

  return (
    <div className="container-page">
      {showAddGasto ? (
        <AddGasto
          onClose={() => setShowAddGasto(false)}
          categoriesList={categoriesList}
          setCategoryList={setCategoryList}
          initial={initial}
        />
      ) : (
        <>
          <div className="header-page">
            <h1 style={{ fontSize: "40px" }}>Estado de los gastos</h1>
          </div>
          <div id="bar">
            <div className="bar-container">
              <div className="next-to-bar-left">
                <p className="bold-text">{initial} Bs.</p>
                <p className="thin-text">Saldo inicial</p>
              </div>
              <MultiProgress
                className="progress-bar"
                elements={categoriesList}
                height={81}
                backgroundColor="#D9D9D9"
                //borderRadius="10px"
                roundLastElement={false}
                round={false}
              />
              <div className="next-to-bar-right">
                <p className="bold-text">{total} Bs.</p>
                <p className="thin-text">Total gastado</p>
              </div>
            </div>
            <div id="percentage">
              <h2 style={{ margin: "0px" }}>{totalPercent}%</h2>
            </div>
            <div className="description-div" clas>
              {categoriesList.map((item) => {
                if (item.value > 0) {
                  return (
                    <div className="description-item">
                      <FiberManualRecordIcon sx={{ color: item.color }} />
                      <p>{item.name}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="btn-div">
            <button
              className="btn-primary"
              onClick={() => setShowAddGasto(true)}
            >
              Agregar gasto
            </button>
          </div>
        </>
      )}
    </div>
  );
};
