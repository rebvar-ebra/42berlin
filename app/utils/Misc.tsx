import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number, decimals: number = 1) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + "K";
  } else {
    return num.toString();
  }
};

interface AirQualityIndex {
  rating: number; // This represents the AQI value
  description: string;
}

export const airQualityIndexText: AirQualityIndex[] = [
  { rating: 0, description: "Good" },
  { rating: 1, description: "Moderate" },
  { rating: 2, description: "Unhealthy for Sensitive Groups" },
  { rating: 3, description: "Unhealthy" },
  { rating: 4, description: "Very Unhealthy" },
  { rating: 5, description: "Hazardous" },
];
