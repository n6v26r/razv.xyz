<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import Loader from "./Loader.svelte";
  import {
    nowPlayingStore,
    errorStore,
    loadingStore,
    fetchNowPlaying,
  } from "../stores/nowPlaying";

  let text: string = "";
  $: if ($nowPlayingStore.track && $nowPlayingStore.playing) {
    text = `${$nowPlayingStore.track.name ?? ""} — ${$nowPlayingStore.track.artist ?? ""}`;
  }

  let container: HTMLElement;
  let marquee: HTMLElement;
  let ro: ResizeObserver;

  $: if (marquee) {
    ro.observe(marquee);
  }
  $: if (container) {
    ro.observe(container);
  }

  const SPEED = 60;

  function updateSpeed() {
    if (!marquee) return;
    const contentWidth = marquee.scrollWidth / 2;
    const duration = contentWidth / SPEED;

    marquee.style.setProperty("--duration", `${duration}s`);
  }

  onMount(() => {
    updateSpeed();

    ro = new ResizeObserver(updateSpeed);

    if (!$nowPlayingStore.track && !$nowPlayingStore.playing) {
      fetchNowPlaying();
    }

    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => {
      clearInterval(interval);
      ro?.disconnect();
    };
  });

  onDestroy(() => ro?.disconnect());
</script>

<span>
  {#if $loadingStore}
    <Loader />
  {:else if $errorStore}
    <code><span style="color:var(--red);"></span> {$errorStore}</code>
  {:else if $nowPlayingStore.playing && $nowPlayingStore.track}
    <code class="now-playing-wrapper">
      <span class="now-playing" bind:this={container}>
        <span class="marquee" bind:this={marquee}>
          <span class="marquee__content">
            {text}
          </span>
          <span class="marquee__content" aria-hidden="true">
            {text}
          </span>
        </span>
      </span>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a
        href={$nowPlayingStore.track.url}
        target="_blank"
        rel="noopener noreferrer"
        ><svg
          id="wave"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 38.05"
        >
          <path
            id="Line_1"
            data-name="Line 1"
            d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
          />
          <path
            id="Line_2"
            data-name="Line 2"
            d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
          />
          <path
            id="Line_3"
            data-name="Line 3"
            d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
          />
          <path
            id="Line_4"
            data-name="Line 4"
            d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
          />
          <path
            id="Line_5"
            data-name="Line 5"
            d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
          />
          <path
            id="Line_6"
            data-name="Line 6"
            d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
          />
          <path
            id="Line_7"
            data-name="Line 7"
            d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
          />
          <path
            id="Line_8"
            data-name="Line 8"
            d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
          />
          <path
            id="Line_9"
            data-name="Line 9"
            d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
          />
        </svg>
      </a>
    </code>
  {:else}
    <code>no music :c</code>
  {/if}
</span>

<style lang="scss">
  #wave {
    height: 1em;
    width: 2em;
    fill: var(--accent);
    vertical-align: middle;

    path {
      stroke: var(--accent);
      stroke-width: 1.5px;
    }
  }

  @for $i from 1 through 9 {
    #Line_#{$i} {
      animation: pulse 0.7s infinite;
      animation-delay: $i * 0.15s;
    }
  }

  @keyframes pulse {
    0% {
      transform: scaleY(1);
      transform-origin: 50% 50%;
    }

    50% {
      transform: scaleY(0.7);
      transform-origin: 50% 50%;
    }

    100% {
      transform: scaleY(1);
      transform-origin: 50% 50%;
    }
  }

  .now-playing-wrapper {
    width: 15em;
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .now-playing {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;

    &:hover .marquee {
      animation-play-state: paused;
    }
  }

  .marquee {
    display: inline-flex;
    width: max-content;
    animation: marquee var(--duration, 10s) linear infinite;
  }

  .marquee__content {
    padding-right: 3rem;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
</style>
