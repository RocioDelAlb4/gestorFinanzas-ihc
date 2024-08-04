import { createContext, useState } from "react";

const GastosContext = createContext();

const GastosProvider = ({ children }) => {
  const [categoriesList, setCategoryList] = useState([
    {
      email: "user@gmail.com",
      password: "user123",
      categoriesList: [
        {
          value: 20,
          color: "#A5F279",
          percent: 20,
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
      ],
      initial: 500,
      dailyLimit: 100,
    },
    {
      email: "user2@gmail.com",
      password: "user2123",
      categoriesList: [
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
      ],
      initial: 400,
      dailyLimit: 50,
    },
  ]);

  const [userLogged, setUserLogged] = useState(
    //   {
    //   email: "",
    //   password: "",
    //   categoriesList: [],
    //   initial: 0,
    //   dailyLimit: 0,
    // }
    {
      email: "user@gmail.com",
      password: "user123",
      categoriesList: [
        {
          value: 20,
          color: "#A5F279",
          percent: 20,
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
      ],
      initial: 500,
      dailyLimit: 100,
    }
  );

  // const [userLogged, setUserLogged] = useState(null);

  const [initial, setInitial] = useState(500);

  return (
    <GastosContext.Provider
      value={{
        categoriesList,
        setCategoryList,
        initial,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </GastosContext.Provider>
  );
};

export { GastosContext, GastosProvider };
