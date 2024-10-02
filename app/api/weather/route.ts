import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return new Response("API key not found", { status: 500 });
    }

    // Correctly extract lat/lon from query parameters
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Missing or invalid latitude/longitude parameters", {
        status: 400,
      });
    }

    // Construct the OpenWeather API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching forecast data", error);

    if (axios.isAxiosError(error) && error.response) {
      return new Response(`Error: ${error.response.statusText}`, {
        status: error.response.status,
      });
    }

    return new Response("An unexpected error occurred", { status: 500 });
  }
}
