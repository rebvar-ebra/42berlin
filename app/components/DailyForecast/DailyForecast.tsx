"use client";
import React, { useMemo } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "@/app/utils/Misc";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext(); // Always call hooks at the top

  // Safely destructure forecast data
  const { weather } = forecast || {};
  const { city, list } = fiveDayForecast || {};

  // Memoize weather icon based on current weather condition, default to clearSky if missing
  const weatherMain = weather && weather[0]?.main;
  const weatherIcon = useMemo(() => {
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
  }, [weatherMain]);

  // Check if forecast data is available
  const isLoading = !fiveDayForecast || !city || !list || !forecast || !weather || !weather[0];
  const todayString = new Date().toISOString().split("T")[0];

  // Filter the list for today's forecast if the data is available
  const todaysForecast = isLoading
    ? []
    : list.filter(
        (forecastItem: { dt_txt: string; main: { temp: number } }) =>
          forecastItem.dt_txt.startsWith(todayString)
      );

  // Render loading skeleton if data is missing
  if (isLoading) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Handle case when today's forecast data is not available
  if (todaysForecast.length < 1) {
    return (
      <div className="h-[12rem] w-full col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2 flex justify-center items-center">
        <h1 className="text-[3rem] line-through text-rose-500">No Data Available!</h1>
      </div>
    );
  }

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {todaysForecast.map(
                (forecastItem: { dt_txt: string; main: { temp: number } }) => (
                  <CarouselItem
                    key={forecastItem.dt_txt}
                    className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                  >
                    <p className="text-gray-300">{moment(forecastItem.dt_txt).format("HH:mm")}</p>
                    <span className="text-3xl">{weatherIcon}</span>
                    <p className="mt-4">{kelvinToCelsius(forecastItem.main.temp)}°C</p>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default DailyForecast;
