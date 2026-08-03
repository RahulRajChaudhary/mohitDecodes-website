import { NextResponse } from "next/server";
import { searchChannelVideos } from "@/lib/youtube";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const pageToken = searchParams.get("pageToken") || undefined;

  const result = await searchChannelVideos({ query: q, pageToken, maxResults: 20 });
  return NextResponse.json(result);
}
