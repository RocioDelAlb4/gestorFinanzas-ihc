import React, { useContext, useEffect, useState } from "react";
import MultiProgress from "react-multi-progress";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./styles/index.css";
import "../assets/globals.css";
import { AddGasto } from "../components/Gastos/AddGasto";
import { GastosContext } from "../context/GastosContext";

export const HomePage = () => {
  const [totalPercent, setTotalPercent] = useState(0);
  const [total, setTotal] = useState(0);

  const [showAddGasto, setShowAddGasto] = useState(false);

  const {
    categoriesList,
    setCategoryList,
    initial,
    userLogged,
    setUserLogged,
  } = useContext(GastosContext);

  useEffect(() => {
    const totalAux = userLogged.categoriesList.reduce(
      (accumulator, item) => accumulator + item.percent,
      0
    );

    setTotalPercent((totalAux * 100) / userLogged.dailyLimit);
    setTotal(totalAux);
  }, [userLogged]);

  return (
    <div className="container-page">
      {showAddGasto ? (
        <AddGasto
          onClose={() => setShowAddGasto(false)}
          userLogged={userLogged}
          setUserLogged={setUserLogged}
          initial={userLogged.dailyLimit}
        />
      ) : (
        <>
          <div className="header-page">
            <h1 style={{ fontSize: "40px" }}>Estado de los gastos</h1>
          </div>
          <div id="bar">
            <div className="bar-container">
              <div className="next-to-bar-left">
                <p className="bold-text">{total} Bs.</p>
                <p className="thin-text">Total gastado</p>
              </div>
              <MultiProgress
                className="progress-bar"
                elements={userLogged.categoriesList}
                height={81}
                backgroundColor="#D9D9D9"
                //borderRadius="10px"
                roundLastElement={false}
                round={false}
              />

              <div className="next-to-bar-right">
                <p className="bold-text">{userLogged.dailyLimit} Bs.</p>
                <p className="thin-text">Limite diario</p>
              </div>
            </div>
            <div id="percentage">
              <h2 style={{ margin: "0px" }}>{totalPercent}%</h2>
            </div>
            <div className="description-div" clas>
              {userLogged.categoriesList.map((item) => {
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
