// pages/api/weather.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.WEATHER_API_KEY; // Ensure you set this in your .env.local

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query; // Extract the city from the query parameters

  // Check if the city query parameter is provided
  if (!city || Array.isArray(city)) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Return the fetched weather data
    return res.status(200).json(response.data);
  } catch (error: unknown) {
    // Handle errors, checking for specific cases
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ error: "City not found" });
      }
      return res
        .status(500)
        .json({ error: error.message || "An error occurred" });
    }

    // Handle other types of errors (if any)
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
