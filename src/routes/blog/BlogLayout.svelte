<script module>
  export const prerender = true;
</script>

<script>
  import ThemedImage from "$lib/components/ThemedImage.svelte";

  export let data;
  export let title;
  export let date;
  export let tags;
  export let banner;
</script>

<header>
  <!-- svelte-ignore a11y_img_redundant_alt -->
  {#if banner}
    <ThemedImage name="image" path={data.currentPath} class="post-image" />
  {/if}
  <h1 class="post-title">{title}</h1>
  {#if date}
    <div class="post-date"><small>{date}</small></div>
  {/if}
  {#if tags}
    <div class="tag-list">
      <span style="font-family:'Nerd Font'; padding-right:0.5em"> </span>
      {#each tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>
  {/if}
</header>
<slot />

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  @use "blogposts.css" as blogposts;

  h1.post-title {
    margin-bottom: 0;
  }

  .post-image {
    margin-top: 5%;
  }

  .tag-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: none !important;
  }

  .post-date {
    text-align: center;
    color: var(--text) !important;
    margin: 0;

    &:before {
      margin-right: 7px;
    }
  }

  div.tag {
    background-color: var(--mantle) !important;
  }

  header {
    margin-bottom: 10%;
  }
</style>
