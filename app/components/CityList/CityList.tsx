// components/CityList.tsx
import React from "react";
import defaultStates from "@/app/utils/defaultStates";

interface CityListProps {
  onCityClick: (lat: number, lon: number) => void;
}

const CityList: React.FC<CityListProps> = ({ onCityClick }) => {
  return (
    <div className="states flex flex-col gap-3 flex-1">
      <h2 className="flex items-center gap-2 font-medium">Top Large Cities</h2>
      <div className="flex flex-col gap-4">
        {defaultStates.map((state, index) => (
          <div
            key={index}
            className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
            onClick={() => onCityClick(state.lat, state.lon)}
          >
            <p className="px-6 py-4">{state.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
