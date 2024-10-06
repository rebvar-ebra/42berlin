"use client";

import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { sun } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function UvIndex() {
  const { uvIndex } = useGlobalContext();
  if (!uvIndex || !uvIndex.daily)
    return <Skeleton className="h-[12rem] w-full" />;
  const { daily } = uvIndex;

  const { uv_index_clear_sky_max, uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    } else {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
  };
  return (
    <div className="pt-6 pb-5 gap-5 border flex flex-col dark:bg-dark-grey shadow-sm dark:shadow-none rounded-lg">
      <div className="top">
        <h2 className="flex items-centergap-2 font-medium">{sun} Uv Index</h2>
        <div className="pt-4 flex-col flex gap-1">
          <p className="text-2xl">
            {uvIndexMax}{" "}
            <span className="tex-sm">({uvIndexCategory(uvIndexMax).text})</span>
          </p>
        </div>
      </div>
    </div>
  );
}
