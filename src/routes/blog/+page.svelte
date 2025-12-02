<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    initTagState,
    toggleTag,
    updateUrl,
    matches,
  } from "$lib/blog/filter";
  import TagFilter from "$lib/components/TagFilter.svelte";

  export let data;
  const posts = data.posts;

  let { selectedTags, allTags } = initTagState(posts);

  function onToggle(tag: string) {
    selectedTags = toggleTag(tag, selectedTags);
    updateUrl(selectedTags);
  }

  $: postsMatchingFilters =
    selectedTags.size === 0
      ? posts
      : posts.filter((post) => matches(post, selectedTags));
</script>

<h1>
  Blog <a class="rss-icon" aria-label="rss" href="/blog/rss.xml"
    ><i class="fa-solid fa-rss"></i></a
  >
</h1>

<TagFilter bind:selectedTags {allTags} {onToggle} />

<div style="padding-bottom:20px;">
  {#each postsMatchingFilters as post (post.slug)}
    <div class="post-details">
      <div class="row">
        <a class="post-title" href={`/blog/${post.slug}`}
          >{post.metadata.title}</a
        >
        {#if post.metadata.tags}
          <span class="tag-list">
            <span style="font-family:'Nerd Font'; padding-right:0.5em"> </span>
            {#each post.metadata.tags as tag}
              <div class="tag">{tag}</div>
            {/each}
          </span>
        {/if}
      </div>
      {#if post.metadata.date}
        <div class="post-date">{post.metadata.date}</div>
      {/if}
      {#if post.metadata.desc}
        <div class="desc">{post.metadata.desc}</div>
      {/if}
    </div>
  {/each}
  {#if !postsMatchingFilters.length}
    <div class="wrapper" in:scale={{ duration: 300 }}>
      <p style="text-align:center;">(TwT) It's so sad here...</p>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "blogposts.css";
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--surface2);
  }
</style>
