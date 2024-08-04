import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usersList, setUsersList] = useState([
    {
      name: "user@gmail.com",
      password: "user123",
      categoryList: [
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
      initial: 500,
      dailyLimit: 100,
    },
    {
      name: "user2@gmail.com",
      password: "user2123",
      categoryList: [
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
      initial: 500,
      dailyLimit: 100,
    },
  ]);

  return <GastosContext.Provider value={{}}>{children}</GastosContext.Provider>;
};

export { UserContext, UserProvider };
