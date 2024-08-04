import { createContext, useEffect, useState } from "react";
import { getDataCategories } from "../services/api";

const GastosContext = createContext();

const GastosProvider = ({ children }) => {
  const [categoriesList, setCategoryList] = useState([
    {
      email: "erika@gmail.com",
      password: "erika",
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
      email: "maria@gmail.com",
      password: "maria",
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
    {
      email: "jhonny@gmail.com",
      password: "jhonny",
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
      dailyLimit: 20,
    },
    {
      email: "jhonatan@gmail.com",
      password: "jhonatan",
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
      initial: 200,
      dailyLimit: 150,
    },
    {
      email: "lizbeth@gmail.com",
      password: "lizbeth",
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
      dailyLimit: 200,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataCategories();
        console.log("🚀 ~ fetchData ~ result:", result);
        // setCategories(result);
        const categories = result.map((element) => {
          return { ...element, value: 0, percent: 0 };
        });
        const newList = categoriesList.map((element) => {
          return { ...element, categoriesList: categories };
        });
        console.log("🚀 ~ newList ~ newList:", newList);
        setCategoryList(newList);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const [userLogged, setUserLogged] = useState(
    {
      email: "",
      password: "",
      categoriesList: [],
      initial: 0,
      dailyLimit: 0,
    }
    // {
    //   email: "user@gmail.com",
    //   password: "user123",
    //   categoriesList: [
    //     {
    //       value: 20,
    //       color: "#A5F279",
    //       percent: 20,
    //       name: "Alimentacion",
    //     },
    //     {
    //       value: 0,
    //       color: "#966FD6",
    //       percent: 0,
    //       name: "Transporte",
    //     },
    //     {
    //       value: 0,
    //       color: "#779ECB",
    //       percent: 0,
    //       name: "Estudios",
    //     },
    //   ],
    //   initial: 500,
    //   dailyLimit: 100,
    // }
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
