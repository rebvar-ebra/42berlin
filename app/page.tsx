"use client"
import {
  Navbar,
  Teamperature,
  AirPollution,
  FiveDayForecast,
  Mapbox,
  Sunset,
  Wind,
  DailyForecast,
  Population,
  FeelsLike,
  Humidity,CityList
} from "./components/index";
import { useGlobalContext } from "./context/globalContext";
import { useState } from "react";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getClickedCityCords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      await setActiveCityCoords([lat, lon]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError("Failed to set city coordinates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Teamperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <Population />
            <FeelsLike />
            <Humidity />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-4">
                <CityList onCityClick={getClickedCityCords} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
