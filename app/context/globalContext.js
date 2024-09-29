"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios

// Create contexts
const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({}); // Use setForecast for updating forecast state

  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");
      console.log("res:", res.data);
      setForecast(res.data); // Set the forecast data
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <GlobalContext.Provider >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Custom hooks to use the context values
export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
