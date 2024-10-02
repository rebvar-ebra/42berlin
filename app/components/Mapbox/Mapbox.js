"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      console.log("Flying to coordinates:", activeCityCords);
      map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions);
    }
  }, [activeCityCords, map]);

  return null;
}
function Mapbox() {
	const { forecast } = useGlobalContext(); // Ensure you destructure forecast

	const activeCityCords = forecast?.coord; // Ensure forecast has coord property

	if (!forecast || !forecast.coord || !activeCityCords) {
	  return (
		<div className="flex items-center space-x-4">
		  <Skeleton className="h-12 w-12 rounded-full" />
		  <div className="space-y-2">
			<Skeleton className="h-4 w-[150px]" />
			<Skeleton className="h-4 w-[100px]" />
		  </div>
		  <p>Loading map...</p>
		</div>
	  );
	}

	return (
	  <div className="flex-1 basis-[50%] border rounded-lg">
		<MapContainer
		  center={[activeCityCords.lat, activeCityCords.lon]}
		  zoom={13}
		  scrollWheelZoom={false}
		  className="rounded-lg m-4"
		  style={{ height: "400px", width: "100%" }} // Fixed height for testing
		>
		  <TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  />
		  <FlyToActiveCity activeCityCords={activeCityCords} />
		</MapContainer>
	  </div>
	);
  }


export default Mapbox;
