import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Construct the daily forecast URL
    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch data from the OpenWeatherMap API
    const dailyRes = await axios.get(dailyUrl, {
      next: { revalidate: 3600 },
    });

    // Use the data directly from the Axios response
    const dailyData = dailyRes.data;

    // Return the JSON response
    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data", error);
    return new Response("Error in getting daily data", { status: 500 });
  }
}
