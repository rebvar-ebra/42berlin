import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`;
    const response = await axios.get(url);
    console.log("Response data:", response.data);

    return new NextResponse(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.log("Error fetching forecast data", error);

    return new NextResponse("Error fetching forecast data", { status: 500 });
  }
}
