"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "@/app/utils/Misc";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  if (!forecast || !fiveDayForecast) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!city || !list || !weather || weather.length === 0) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Log the list to inspect the dt_txt format
  console.log("Five Day Forecast List:", list.map(item => item.dt_txt));

  // Get the current date and time
  const now = moment();

  // Filter the list to find the next available forecast starting from today or later
  const nextForecast = list.filter((forecastItem: { dt_txt: string }) =>
    moment(forecastItem.dt_txt).isSameOrAfter(now)
  );

  console.log("Filtered Next Forecast:", nextForecast);

  if (nextForecast.length === 0) {
    return (
      <div className="h-[12rem] w-full col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2 flex justify-center items-center">
        <h1 className="text-[3rem] line-through text-rose-500">No Data Available!</h1>
      </div>
    );
  }

  // Get the weather icon based on the main weather type
  const getIcon = (mainWeather: string) => {
    switch (mainWeather) {
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
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {nextForecast.map((forecastItem: { dt_txt: string; main: { temp: number } }) => (
                <CarouselItem key={forecastItem.dt_txt} className="flex flex-col gap-4 basis-[8.5rem] cursor-grab">
                  <p className="text-gray-300">
                    {moment(forecastItem.dt_txt).format("HH:mm")}
                  </p>
                  <span className="text-3xl">{getIcon(weather[0].main)}</span>
                  <p className="mt-4">{kelvinToCelsius(forecastItem.main.temp)}°C</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default DailyForecast;
