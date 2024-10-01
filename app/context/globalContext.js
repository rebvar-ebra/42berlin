"use client"
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({}); // Initialize forecast as an empty object

  const fetchForecast = async () => {
    try {
      // Set latitude and longitude for Berlin as default values
      const params = { lat: 52.52, lon: 13.405 };

      const res = await axios.get("/api/weather", { params });
      console.log("API response in context:", res.data);

      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  console.log("Forecast data in context:", forecast); // Add this log to check context state

  return (
    <GlobalContext.Provider value={forecast}>
      <GlobalContextUpdate.Provider value={setForecast}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
