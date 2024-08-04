import { createContext, useState } from "react";

const GastosContext = createContext();

const GastosProvider = ({ children }) => {
  const [categoriesList, setCategoryList] = useState([
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
  ]);

  const [initial, setInitial] = useState(500);

  return (
    <GastosContext.Provider
      value={{ categoriesList, setCategoryList, initial }}
    >
      {children}
    </GastosContext.Provider>
  );
};

export { GastosContext, GastosProvider };
