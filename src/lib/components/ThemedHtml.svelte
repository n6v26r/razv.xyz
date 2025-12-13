<script>
  import { onMount, onDestroy } from "svelte";
  import { theme } from "$lib/stores/theme";

  export let html;
  let host;
  let mainEl;
  let unsubscribe;
  let shadow;

  function themedSrc(src, flavor) {
    if (!src || !flavor) return src;

    const [path, suffix = ""] = src.split(/(?=[?#])/);

    const match = path.match(/^(.*?)(\.[^.\/]+)?$/);
    if (!match) return src;

    const [, base, ext = ""] = match;
    return `${base}_catppuccin-${flavor}${ext}${suffix}`;
  }

  function themeImages(flavor) {
    shadow.querySelectorAll("img").forEach((img) => {
      if (!img.dataset.baseSrc) {
        img.dataset.baseSrc = img.src;
      }

      img.src = themedSrc(img.dataset.baseSrc, flavor);
    });
  }

  function applyTheme(t) {
    mainEl.setAttribute("data-theme", t);
    themeImages(t);
  }

  onMount(() => {
    shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = html.replace(/:root/g, ":host");

    mainEl = shadow.querySelector("main");
    unsubscribe = theme.subscribe(applyTheme);
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<div bind:this={host}></div>
