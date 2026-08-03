const REVALIDATE_SECONDS = 3600;
export const SHORT_MAX_DURATION_SECONDS = 180;

function getUploadsPlaylistId(channelId) {
  return `UU${channelId.slice(2)}`;
}

function parseDurationToSeconds(iso) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!match) return 0;
  const [, h, m, s] = match;
  return (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);
}

export function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function formatViewCount(count) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(count || 0);
}

async function fetchVideoDetails(apiKey, ids) {
  if (ids.length === 0) return new Map();

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "contentDetails,statistics");
  url.searchParams.set("id", ids.join(","));
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return new Map();

  const data = await res.json();
  const map = new Map();

  for (const item of data.items || []) {
    map.set(item.id, {
      durationSeconds: parseDurationToSeconds(item.contentDetails?.duration),
      viewCount: Number(item.statistics?.viewCount) || 0,
    });
  }

  return map;
}


export async function getVideoPage({ pageToken, maxResults = 20 } = {}) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return { items: [], nextPageToken: null };
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", getUploadsPlaylistId(channelId));
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("key", apiKey);
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return { items: [], nextPageToken: null };

  const data = await res.json();
  const rawItems = (data.items || []).filter((item) => item.snippet?.resourceId?.videoId);
  const ids = rawItems.map((item) => item.snippet.resourceId.videoId);
  const detailsMap = await fetchVideoDetails(apiKey, ids);

  const items = rawItems.map((item) => {
    const { snippet } = item;
    const videoId = snippet.resourceId.videoId;
    const details = detailsMap.get(videoId) || { durationSeconds: 0, viewCount: 0 };
    const thumbnail =
      snippet.thumbnails?.maxres ||
      snippet.thumbnails?.high ||
      snippet.thumbnails?.medium ||
      snippet.thumbnails?.default;

    return {
      id: videoId,
      title: snippet.title,
      thumbnail: thumbnail?.url,
      publishedAt: snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      durationSeconds: details.durationSeconds,
      viewCount: details.viewCount,
      isShort: details.durationSeconds > 0 && details.durationSeconds <= SHORT_MAX_DURATION_SECONDS,
    };
  });

  return { items, nextPageToken: data.nextPageToken || null };
}

// search.list hits YouTube's own search index across the whole channel
// (unlike playlistItems, which only walks upload order), so it's the only
// reliable way to find an older video by title without paging through the
// entire catalog client-side. Costs far more API quota per call than
// playlistItems/videos.list, so it's only used when a viewer types a query.
export async function searchChannelVideos({ query, pageToken, maxResults = 20 } = {}) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId || !query?.trim()) {
    return { items: [], nextPageToken: null };
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("order", "relevance");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("key", apiKey);
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return { items: [], nextPageToken: null };

  const data = await res.json();
  const rawItems = (data.items || []).filter((item) => item.id?.videoId);
  const ids = rawItems.map((item) => item.id.videoId);
  const detailsMap = await fetchVideoDetails(apiKey, ids);

  const items = rawItems.map((item) => {
    const { snippet } = item;
    const videoId = item.id.videoId;
    const details = detailsMap.get(videoId) || { durationSeconds: 0, viewCount: 0 };
    const thumbnail =
      snippet.thumbnails?.maxres ||
      snippet.thumbnails?.high ||
      snippet.thumbnails?.medium ||
      snippet.thumbnails?.default;

    return {
      id: videoId,
      title: snippet.title,
      thumbnail: thumbnail?.url,
      publishedAt: snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      durationSeconds: details.durationSeconds,
      viewCount: details.viewCount,
      isShort: details.durationSeconds > 0 && details.durationSeconds <= SHORT_MAX_DURATION_SECONDS,
    };
  });

  return { items, nextPageToken: data.nextPageToken || null };
}

export async function getFeaturedPlaylists({ maxResults = 12 } = {}) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return [];

  const url = new URL("https://www.googleapis.com/youtube/v3/playlists");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return [];

  const data = await res.json();

  return (data.items || []).map((item) => {
    const thumbnail =
      item.snippet.thumbnails?.maxres ||
      item.snippet.thumbnails?.high ||
      item.snippet.thumbnails?.medium ||
      item.snippet.thumbnails?.default;

    return {
      id: item.id,
      title: item.snippet.title,
      thumbnail: thumbnail?.url,
      videoCount: item.contentDetails?.itemCount || 0,
      url: `https://www.youtube.com/playlist?list=${item.id}`,
    };
  });
}

export const FULL_COURSE_MIN_DURATION_SECONDS = 3 * 60 * 60;
const MAX_FULL_COURSE_PAGES = 8;

// Full-course compilations (3hr+) are rare and scattered through upload
// history, so walk multiple raw pages collecting matches instead of
// filtering a single page (which would usually come back empty).
export async function getFullCourseVideos({ maxResults = 6 } = {}) {
  const matches = [];
  let pageToken;

  for (let i = 0; i < MAX_FULL_COURSE_PAGES && matches.length < maxResults; i++) {
    const page = await getVideoPage({ pageToken, maxResults: 20 });
    matches.push(...page.items.filter((v) => v.durationSeconds >= FULL_COURSE_MIN_DURATION_SECONDS));

    if (!page.nextPageToken) break;
    pageToken = page.nextPageToken;
  }

  return matches.slice(0, maxResults);
}
