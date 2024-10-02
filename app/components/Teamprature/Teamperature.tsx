"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/app/context/globalContext";
import React, { useState, useEffect, useMemo } from "react";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/Misc";
import moment from "moment";

export default function Temperature() {
  const {forecast} = useGlobalContext(); // Get the forecast data from context

  // Log the forecast data for debugging
  console.log("Forecast data:", forecast);

  // Check for forecast data
  if (!forecast || Object.keys(forecast).length === 0) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    );
  }

  // Destructure forecast data
  const { main, timezone, name, weather } = forecast;

  // Check for necessary data
  if (!main || !weather || weather.length === 0) {
    return <div>Error: Missing weather data</div>; // Fallback if necessary data is not available
  }

  // Memoize temperature conversions
  const temp = useMemo(() => kelvinToCelsius(main.temp), [main.temp]);
  const minTemp = useMemo(() => kelvinToCelsius(main.temp_min), [main.temp_min]);
  const maxTemp = useMemo(() => kelvinToCelsius(main.temp_max), [main.temp_max]);

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // Use effect for local time update
  useEffect(() => {
    if (!timezone) return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      setLocalTime(localMoment.format("HH:mm:ss"));
      setCurrentDay(localMoment.format("dddd"));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  // Memoize the weather icon calculation
  const icon = useMemo(() => {
    if (!weather || weather.length === 0) return clearSky; // Default icon
    const { main: weatherMain } = weather[0];
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  }, [weather]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col
      justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span>{icon}</span>
          <p className="pt-2 capitalize text-lg font-medium">{weather[0].description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}
