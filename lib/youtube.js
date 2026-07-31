const REVALIDATE_SECONDS = 3600;

export async function getLatestVideos(count = 5) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return [];
  }

  const uploadsPlaylistId = `UU${channelId.slice(2)}`;

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", uploadsPlaylistId);
  url.searchParams.set("maxResults", String(count));
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return (data.items || [])
    .filter((item) => item.snippet?.resourceId?.videoId)
    .map((item) => {
      const { snippet } = item;
      const thumbnail =
        snippet.thumbnails?.maxres ||
        snippet.thumbnails?.high ||
        snippet.thumbnails?.medium ||
        snippet.thumbnails?.default;

      return {
        id: snippet.resourceId.videoId,
        title: snippet.title,
        thumbnail: thumbnail?.url,
        publishedAt: snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
      };
    });
}
