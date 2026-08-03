import { NextResponse } from "next/server";
import { getVideoPage } from "@/lib/youtube";
import { categorizeVideo } from "@/lib/categorizeVideo";


const MAX_PAGES_PER_REQUEST = 6;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") === "short" ? "short" : "long";
  const category = searchParams.get("category");
  let pageToken = searchParams.get("pageToken") || undefined;

  const collected = [];
  let nextPageToken = null;
  let matched = false;

  for (let i = 0; i < MAX_PAGES_PER_REQUEST; i++) {
    const page = await getVideoPage({ pageToken, maxResults: 20 });
    collected.push(...page.items);
    nextPageToken = page.nextPageToken;

    const pageHasMatch = page.items.some((video) => {
      if (type === "short") return video.isShort;
      if (category) return !video.isShort && categorizeVideo(video.title) === category;
      return !video.isShort;
    });
    if (pageHasMatch) matched = true;

    if (matched || !nextPageToken) break;
    pageToken = nextPageToken;
  }

  return NextResponse.json({ items: collected, nextPageToken });
}
