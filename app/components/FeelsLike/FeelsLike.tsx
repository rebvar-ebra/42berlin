"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/Misc";

// Utility function to determine how the temperature feels
const getFeelsLikeDescription = (feelsLike: number, minTemp: number, maxTemp: number) => {
  const avgTemp = (minTemp + maxTemp) / 2;
  if (feelsLike < avgTemp - 5) return "Feels significantly colder than actual temperature.";
  if (feelsLike <= avgTemp + 5) return "Feels close to the actual temperature.";
  return "Feels significantly warmer than actual temperature.";
};

export default function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast?.main) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast.main;

  return (
    <div className="pb-5 pt-6 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer}Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}</p>
      </div>
      <p className="text-sm">{getFeelsLikeDescription(feels_like, temp_min, temp_max)}</p>
    </div>
  );
}
