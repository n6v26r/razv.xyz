<script lang="ts">
  import { onMount } from "svelte";

  export let delay = 100;

  const frames = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];

  let index = 0;
  let frame = frames[index];
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      index = (index + 1) % frames.length;
      frame = frames[index];
    }, delay);

    return () => clearInterval(interval);
  });
</script>

<code>{frame}</code>
