<script>
  import { page } from "$app/state";
  import { theme } from "$lib/stores/theme";

  export let name;
  export let path = page.url.pathname;
  export let ext = "";
</script>

<img src="{path}/images/{name}_catppuccin-{$theme}{ext}" alt={name} {...$$restProps}/>
