<script>
  import { page } from "$app/state";
  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";

  export let name;
  export let path = page.url.pathname;
  export let ext = "";
  export let preload = false;

  let src = "";
  let loaded = !preload;

  $: src = `${path}/${name}_catppuccin-${$theme}${ext}`;

  onMount(() => {
    if (preload) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded = true;
      };
    }
  });
</script>

{#if loaded}
  <img src="{src}" alt={name} {...$$restProps} />
{:else}
  <div style="width: 100%; height: 100%; background: var(--base);"></div>
{/if}
