<script lang="ts">
  export let allTags: string[] = [];
  export let selectedTags: Set<string> = new Set();
  export let onToggle: (tag: string) => void; // optional callback

  function toggle(tag: string) {
    if (onToggle) {
      onToggle(tag);
    } else {
      const newSelected = new Set(selectedTags);
      if (selectedTags.has(tag)) {
        newSelected.delete(tag);
      } else {
        newSelected.add(tag);
      }
      selectedTags = newSelected;
    }
  }
</script>

<div
  class="font-trick"
  style="font-family:'Nerd Font'; font-weight:bold;"
></div>
<div class="font-trick" style="font-family:'Nerd Font';"></div>

{#if allTags.length}
  <div>
    <i class="fa-solid fa-filter"></i>
    {#each allTags as tag}
      <button
        class="tag-btn"
        class:selected={selectedTags.has(tag)}
        on:click={() => toggle(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
{/if}

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  @use "../../routes/blog/blogposts.css";

  button.tag-btn {
    font-family: "LXGW WenKai Mono TC";

    &.selected {
      font-weight: bold;
      box-shadow: 0 0 0 calc(0.8 * var(--space-xxs)) var(--accent);
      margin-right: calc(1.8 * var(--space-xxs));
      margin-left: calc(1.8 * var(--space-xxs));

      &:before {
        font-family: "Nerd Font";
        content: " ";
        color: var(--accent);
      }
    }

    margin: var(--space-xxs);
    padding: var(--space-xxs) var(--space-xs);
    font-size: 80%;
    color: var(--text) !important;
    background-color: var(--crust);
    border-radius: 9999px;
    border: none;
    transition: all 0.05s;
  }
</style>
