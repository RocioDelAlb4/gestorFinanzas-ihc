const BASE_URL = "http://localhost:3000";

//! categorias

export const getDataCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categoria`);
    if (!response.ok) {
      throw new Error("Error en la respuesta");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la respuesta:", error);
    throw error;
  }
};

export const postData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error en la respuesta");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en la respuesta", error);
    throw error;
  }
};
