"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const params = { lat: 52.52, lon: 13.405 };
      const res = await axios.get("/api/weather", { params });
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const params = { lat: 52.52, lon: 13.405 };
      const res = await axios.get("/api/pollution", { params });
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const params = { lat: 52.52, lon: 13.405 };
      const res = await axios.get("/api/fiveday", { params });
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five-day forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);


  return (
    <GlobalContext.Provider value={( forecast, airQuality, fiveDayForecast) }>
      <GlobalContextUpdate.Provider >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Custom hooks to use the context values
export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
