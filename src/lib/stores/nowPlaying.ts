import { page } from "$app/state";
import { writable } from "svelte/store";

export interface Track {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string | null;
}

export interface NowPlaying {
  playing: boolean;
  track: Track | null;
}

export const nowPlayingStore = writable<NowPlaying>({
  playing: false,
  track: null,
});

export const errorStore = writable<string | null>(null);
export const loadingStore = writable<boolean>(true);
let initalLoad: boolean = true;

export async function fetchNowPlaying() {
  if (page.url.pathname !== "/") return;

  if (initalLoad) loadingStore.set(true);
  errorStore.set(null);

  try {
    const res = await fetch("/api/now-playing");
    if (!res.ok) throw new Error("err TwT");
    const data: NowPlaying = await res.json();
    nowPlayingStore.set(data);
  } catch (err: any) {
    console.error(err);
    errorStore.set(err.message || "Unknown error");
  } finally {
    loadingStore.set(false);
    initalLoad = false;
  }
}
