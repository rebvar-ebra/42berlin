"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumdityText = (humidity: number) => {
    if (humidity < 30) return "Dry : May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comforable : Ideal for heealth and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey
  shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>
      <p className="text-sm">
        <span className="text-red-500 text-sm">
          {getHumdityText(humidity)}
        </span>
      </p>
    </div>
  );
}
