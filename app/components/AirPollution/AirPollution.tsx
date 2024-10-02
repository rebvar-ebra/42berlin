"use client";

import React from "react";
import { thermo } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/app/context/globalContext";
import { airQualityIndexText } from "@/app/utils/Misc";
import { Progress } from "@/components/ui/progress";

export default function AirPollution() {
  const {airQuality} = useGlobalContext();

  // Debugging: Log the air quality data
  console.log("Air Quality Data:", airQuality);

  // Check if airQuality is available and necessary properties are defined
  if (!airQuality) {
    console.warn("Air quality data is not available.");
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
  }

  // Ensure the list is present and not empty
  if (!airQuality.list || airQuality.list.length === 0) {
    console.warn("Air quality list is empty.");
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
  }

  // Ensure the main object exists and check for aqi value
  const aqiData = airQuality.list[0].main;
  if (!aqiData || aqiData.aqi === undefined) {
    console.warn("AQI data is missing or undefined.");
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
  }

  // Calculate Air Quality Index (AQI)
  const airQualityIndex = aqiData.aqi; // Use directly without multiplying
  console.log("Air Quality Index:", airQualityIndex); // Log the AQI value

  // Find the corresponding air quality description based on the AQI value
  const filteredIndex = airQualityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  console.log("Air Quality Index Text:", filteredIndex); // Log the description

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">
        Air quality is {filteredIndex ? filteredIndex.description : "unknown"}.
      </p>
    </div>
  );
}
