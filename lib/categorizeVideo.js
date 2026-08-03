import { videoCategories, GENERAL_CATEGORY } from "@/data/videoCategories";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function categorizeVideo(title) {
  const text = title || "";

  for (const category of videoCategories) {
    const matches = category.keywords.some((keyword) =>
      new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i").test(text)
    );
    if (matches) return category.label;
  }

  return GENERAL_CATEGORY;
}
