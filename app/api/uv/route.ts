import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "");
  const lon = parseFloat(searchParams.get("lon") || "");

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude provided" },
      { status: 400 }
    );
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

  try {
    const response = await axios.get(url);
    const { daily } = response.data;

    if (!daily || !daily.uv_index_max || daily.uv_index_max.length === 0) {
      return NextResponse.json(
        { error: "No UV index data available for the provided location" },
        { status: 404 }
      );
    }
    return NextResponse.json({ uvIndex: daily.uv_index_max[0] });

  } catch (error: unknown) { // Use `unknown` instead of `any`
    // Type guard to handle the error safely
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: `Error fetching UV index data: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred while fetching UV index data" },
      { status: 500 }
    );
  }
}
