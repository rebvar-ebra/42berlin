"use client";

import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { sunset } from "@/app/utils/Icons";
import { unixToTime } from "@/app/utils/Misc";

export default function Sunset() {
  // Destructure forecast object from global context
  const { forecast } = useGlobalContext();

  // Debugging: Log the forecast data to ensure correct values
  console.log("Forecast Data:", forecast);

  // Check if forecast, forecast.sys, and forecast.sys.sunset/sunrise exist
  if (
    !forecast ||
    !forecast.sys ||
    typeof forecast.sys.sunset === "undefined" ||
    typeof forecast.sys.sunrise === "undefined"
  ) {
    console.warn("Incomplete or missing forecast data.");
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Destructure required properties
  const { sunset: sunsetTime, sunrise: sunriseTime } = forecast.sys;
  const { timezone } = forecast;

  // Convert Unix timestamps to formatted local times
  const sunsetFormatted = unixToTime(sunsetTime, timezone);
  const sunriseFormatted = unixToTime(sunriseTime, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset}Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetFormatted}</p>
      </div>
      <p className="text-sm">Sunrise: {sunriseFormatted}</p>
    </div>
  );
}
