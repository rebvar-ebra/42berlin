"use client";

import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToCelsius } from "@/app/utils/Misc";
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from "@/app/utils/Icons";

export default function Temperature() {
  const { forecast } = useGlobalContext(); // Hook 1: Always call hooks at the top

  // Define states and memoized values outside conditionals to avoid hook order issues
  const [timeData, setTimeData] = useState({ localTime: "", currentDay: "" });

  // Memoize temperature calculations to avoid recalculations
  const temperatures = useMemo(
    () => ({
      temp: forecast ? kelvinToCelsius(forecast.main?.temp) : null,
      minTemp: forecast ? kelvinToCelsius(forecast.main?.temp_min) : null,
      maxTemp: forecast ? kelvinToCelsius(forecast.main?.temp_max) : null,
    }),
    [forecast]
  );

  // Extract necessary forecast data for readability
  const { main, timezone, name, weather } = forecast || {};

  // Update local time based on the timezone, if available
  useEffect(() => {
    if (!timezone) return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      setTimeData({
        localTime: localMoment.format("HH:mm:ss"),
        currentDay: localMoment.format("dddd"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  // Map weather condition to the corresponding icon
  const weatherIconMap: { [key: string]: JSX.Element } = {
    Drizzle: drizzleIcon,
    Rain: rain,
    Snow: snow,
    Clear: clearSky,
    Clouds: cloudy,
  };

  const weatherIcon = weather && weather[0] ? weatherIconMap[weather[0].main] || clearSky : clearSky;

  // Loading state display
  if (!forecast || !main || !weather || weather.length === 0) {
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

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col
      justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{timeData.currentDay}</span>
        <span className="font-medium">{timeData.localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1 items-center">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temperatures.temp}°</p>

      <div>
        <div className="flex items-center gap-2">
          <span>{weatherIcon}</span>
          <p className="pt-2 capitalize text-lg font-medium">{weather[0].description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {temperatures.minTemp}°</span>
          <span>High: {temperatures.maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}
