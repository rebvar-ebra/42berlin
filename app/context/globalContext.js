"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import defaultStates from "@/app/utils/defaultStates"; // Adjust this import based on your project structure
import { debounce } from "lodash";

// Create a single global context
const GlobalContext = createContext();

// Global Context Provider
export const GlobalContextProvider = ({ children }) => {
  // State variables for weather data
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  // State variables for location and input management
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([
    defaultStates[0].lat,
    defaultStates[0].lon,
  ]);

  // Fetch functions
  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get("/api/weather", { params: { lat, lon } });
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
    }
  };

  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list:", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching UV index:", error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get("/api/pollution", { params: { lat, lon } });
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data:", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get("/api/fiveday", { params: { lat, lon } });
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five-day forecast data:", error.message);
    }
  };

  // Consolidate all API calls into a single function
  const fetchAllData = async (lat, lon) => {
    await Promise.all([
      fetchForecast(lat, lon),
      fetchAirQuality(lat, lon),
      fetchFiveDayForecast(lat, lon),
      fetchUvIndex(lat, lon),
    ]);
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    const [lat, lon] = activeCityCoords;
    fetchAllData(lat, lon);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput: (e) => setInputValue(e.target.value),
        setActiveCityCoords,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

