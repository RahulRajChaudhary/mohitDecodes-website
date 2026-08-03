"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { formatDuration, formatViewCount } from "@/lib/youtube";
import { categorizeVideo } from "@/lib/categorizeVideo";
import VideoPlayerModal from "@/components/sections/VideoPlayerModal";
import VideoCard from "@/components/videos/VideoCard";

const LATEST_TAB = "latest";
const SHORTS_TAB = "shorts";
const TABS = [LATEST_TAB, "Frontend", "Backend", "DSA", SHORTS_TAB];

// Roughly three grid rows at each layout's widest breakpoint (3 cols for
// long-form, 5 cols for Shorts) before a viewer has to hit "Load more".
const LONG_INITIAL_COUNT = 9;
const SHORT_INITIAL_COUNT = 15;
const SEARCH_DEBOUNCE_MS = 400;

// Floor for the Frontend/Backend/DSA tabs: 2 rows at 3 cols. If the videos
// loaded so far don't have that many matches, auto-walk the catalog for
// more instead of leaving the tab looking sparse on first switch.
const MIN_CATEGORY_ROWS_COUNT = 6;
const MAX_AUTO_FILL_FETCHES = 5;

function initialCountFor(tab) {
  return tab === SHORTS_TAB ? SHORT_INITIAL_COUNT : LONG_INITIAL_COUNT;
}

function dedupeAppend(prev, next) {
  const seen = new Set(prev.map((v) => v.id));
  return [...prev, ...next.filter((v) => !seen.has(v.id))];
}

function ShortCard({ video }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 ease-out hover:border-accent/40 hover:shadow-lg motion-safe:hover:-translate-y-1"
    >
      <div className="relative aspect-[9/16] w-full bg-black">
        {hovered ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=1&playsinline=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 780px) 45vw, 18vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
              {formatDuration(video.durationSeconds)}
            </span>
          </>
        )}
      </div>
      <div className="px-2.5 py-2">
        <div className="line-clamp-2 text-[12px] font-semibold leading-[1.3] text-foreground">{video.title}</div>
        <div className="mt-1 text-[10px] text-foreground/64">{formatViewCount(video.viewCount)} views</div>
      </div>
    </div>
  );
}

export default function VideosLibrary({ initialItems = [], initialNextPageToken = null }) {
  const [allItems, setAllItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialNextPageToken);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchCursor, setSearchCursor] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(LATEST_TAB);
  const [visibleCount, setVisibleCount] = useState(() => initialCountFor(LATEST_TAB));
  const [playingVideo, setPlayingVideo] = useState(null);

  const isSearching = debouncedQuery.length > 0;

  // Debounce the query before hitting YouTube's search.list — it costs far
  // more API quota per call than the browse endpoints, so we don't want to
  // fire one on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  // Searching the channel needs YouTube's real search index (search.list),
  // not a filter over whatever's already loaded — otherwise an older video
  // that hasn't been paged into `allItems` yet would look like it doesn't
  // exist.
  useEffect(() => {
    if (!debouncedQuery) {
      setSearchItems([]);
      setSearchCursor(null);
      return undefined;
    }

    let cancelled = false;
    setSearchLoading(true);

    fetch(`/api/videos/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setSearchItems(data.items);
        setSearchCursor(data.nextPageToken);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    setVisibleCount(initialCountFor(activeTab));
  }, [activeTab, debouncedQuery]);

  const sourceItems = isSearching ? searchItems : allItems;
  const longVideos = useMemo(() => sourceItems.filter((v) => !v.isShort), [sourceItems]);
  const shortVideos = useMemo(() => sourceItems.filter((v) => v.isShort), [sourceItems]);

  const isCategoryTab = activeTab !== LATEST_TAB && activeTab !== SHORTS_TAB;

  const tabVideos = useMemo(() => {
    if (activeTab === LATEST_TAB) return longVideos;
    if (activeTab === SHORTS_TAB) return shortVideos;
    // Full courses/long tutorials first, shorter videos fill in after.
    return longVideos
      .filter((v) => categorizeVideo(v.title) === activeTab)
      .sort((a, b) => b.durationSeconds - a.durationSeconds);
  }, [activeTab, longVideos, shortVideos]);

  const visibleVideos = tabVideos.slice(0, visibleCount);
  const canRevealMore = visibleCount < tabVideos.length;
  const activeCursor = isSearching ? searchCursor : cursor;
  const showLoadMore = canRevealMore || Boolean(activeCursor);

  const autoFillAttempts = useRef(0);
  useEffect(() => {
    autoFillAttempts.current = 0;
  }, [activeTab]);

  // Category tabs are filtered from whatever's been loaded so far, which
  // can be sparse right after switching tabs. Auto-walk the catalog (same
  // mechanism as the manual "Load more" network fetch) until there's at
  // least MIN_CATEGORY_ROWS_COUNT matches, instead of requiring clicks.
  useEffect(() => {
    if (isSearching || !isCategoryTab || loading) return;
    if (tabVideos.length >= MIN_CATEGORY_ROWS_COUNT || !cursor) return;
    if (autoFillAttempts.current >= MAX_AUTO_FILL_FETCHES) return;

    let cancelled = false;
    autoFillAttempts.current += 1;
    setLoading(true);

    const params = new URLSearchParams({ type: "long", pageToken: cursor, category: activeTab });
    fetch(`/api/videos?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAllItems((prev) => dedupeAppend(prev, data.items));
        setCursor(data.nextPageToken);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // `loading` is intentionally excluded: this effect sets it synchronously,
    // and including it as a dependency makes the effect re-fire on its own
    // setLoading(true), which cancels the in-flight fetch via the cleanup
    // above before it resolves — leaving `loading` stuck true forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isCategoryTab, isSearching, tabVideos.length, cursor]);

  async function handleLoadMore() {
    if (loading) return;
    const batch = activeTab === SHORTS_TAB ? SHORT_INITIAL_COUNT : LONG_INITIAL_COUNT;

    if (canRevealMore) {
      setVisibleCount((c) => c + batch);
      return;
    }

    if (isSearching) {
      if (!searchCursor) return;
      setLoading(true);
      const res = await fetch(
        `/api/videos/search?q=${encodeURIComponent(debouncedQuery)}&pageToken=${encodeURIComponent(searchCursor)}`
      );
      const data = await res.json();
      setSearchItems((prev) => dedupeAppend(prev, data.items));
      setSearchCursor(data.nextPageToken);
    } else {
      if (!cursor) return;
      setLoading(true);
      const type = activeTab === SHORTS_TAB ? "short" : "long";
      const params = new URLSearchParams({ type, pageToken: cursor });
      if (activeTab !== LATEST_TAB && activeTab !== SHORTS_TAB) params.set("category", activeTab);

      const res = await fetch(`/api/videos?${params.toString()}`);
      const data = await res.json();
      setAllItems((prev) => dedupeAppend(prev, data.items));
      setCursor(data.nextPageToken);
    }

    setVisibleCount((c) => c + batch);
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-accent bg-accent text-white"
                  : "border-border text-foreground/70 hover:bg-surface-hover"
              }`}
            >
              {tab === LATEST_TAB ? "Latest" : tab === SHORTS_TAB ? "Shorts" : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos"
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus:border-accent/40"
          />
        </div>
      </div>

      {isSearching && searchLoading && searchItems.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground/64">Searching...</p>
      ) : tabVideos.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground/64">No videos found.</p>
      ) : activeTab === SHORTS_TAB ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visibleVideos.map((video) => (
            <ShortCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={setPlayingVideo} />
          ))}
        </div>
      )}

      {showLoadMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={loading}
          className="mx-auto mt-8 block rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}

      <VideoPlayerModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
    </div>
  );
}
