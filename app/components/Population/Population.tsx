"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/Misc";

export default function Population() {
  const { fiveDayForecast } = useGlobalContext();
  console.log(fiveDayForecast); // Check if it’s defined

  const { city } = fiveDayForecast;

  if (!city || !fiveDayForecast) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  return (
    <div
      className="pt-6 pb-5 flex flex-col h-[12rem] border rounded-lg gap-8
	dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people}Population
        </h2>
        <p className="pt-4 text-2xl ">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm">Latest UN population data for <span className="text-red-500 text-2xl">{city.name}</span></p>
    </div>
  );
}
