import { page } from "$app/state";
import { goto } from "$app/navigation";

export type PostWithMeta = {
  metadata: {
    tags?: string[];
    date?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export function initTagState(posts: PostWithMeta[]) {
  // Count tags
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  // Sorted unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.metadata.tags ?? []))
  ).sort((a, b) => {
    const diff = (tagCounts.get(b) ?? 0) - (tagCounts.get(a) ?? 0);
    return diff !== 0 ? diff : a.localeCompare(b);
  });

  // Load selected tags from URL
  const tagsParam = page.url.searchParams.get("tags");
  const selectedTags = tagsParam
    ? new Set(tagsParam.split(",").filter(Boolean))
    : new Set<string>();

  return { selectedTags, tagCounts, allTags };
}

export function toggleTag(tag: string, selected: Set<string>) {
  selected.has(tag) ? selected.delete(tag) : selected.add(tag);
  return new Set(selected);
}

export function updateUrl(selected: Set<string>) {
  const query = new URLSearchParams(window.location.search);
  const arr = Array.from(selected);

  if (arr.length) query.set("tags", arr.join(","));
  else query.delete("tags");

  goto(`${page.url.pathname}?${query.toString()}`, {
    replaceState: true,
    noScroll: true
  });
}

export function matches(post: PostWithMeta, selected: Set<string>) {
  const tags = post.metadata.tags ?? [];
  return Array.from(selected).every((t) => tags.includes(t));
}
