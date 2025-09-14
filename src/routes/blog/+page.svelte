<script lang="ts">
  import { type PostModule } from "$lib/post";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    afterNavigate,
    goto,
    pushState,
    replaceState,
  } from "$app/navigation";
  import { page } from "$app/state";
  export let data;

  let selectedTags = new Set<string>();

  const tagCounts = new Map<string, number>();
  for (const post of data.posts) {
    const tags = post.metadata.tags || [];
    for (const tag of tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const allTags = Array.from(
    new Set(data.posts.flatMap((post) => post.metadata.tags || [])),
  ).sort((a: string, b: string) => {
    const tagCountDiff = tagCounts.get(b) - tagCounts.get(a);
    if (tagCountDiff != 0) return tagCountDiff;
    return a < b ? -1 : 1;
  }); // sort by count descending

  function toggleTag(tag: string) {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
    } else {
      selectedTags.add(tag);
    }
    selectedTags = new Set(selectedTags);
    updateUrl(selectedTags);
  }

  function postMatchesSelectedTags(post: PostModule) {
    const postTags = post.metadata.tags || [];
    return Array.from(selectedTags).every((tag) => postTags.includes(tag));
  }

  console.log(page.url);

  const tagsParam = page.url.searchParams.get("tags");
  if (tagsParam) {
    const tagsArray = tagsParam.split(",").filter(Boolean);
    selectedTags = new Set(tagsArray);
  } else {
    selectedTags = new Set();
  }

  // update URL query param without reload
  function updateUrl(tagsSet: Set<string>) {
    const tagsArray = Array.from(tagsSet);
    const query = new URLSearchParams(window.location.search);

    if (tagsArray.length) {
      query.set("tags", tagsArray.join(","));
    } else {
      query.delete("tags");
    }

    let pathname = page.url.pathname;

    goto(`${pathname}?${query.toString()}`, {
      replaceState: true,
      noScroll: true,
    });
  }

  $: postsMatchingFilters = data.posts.filter(
    (post) => selectedTags.size === 0 || postMatchesSelectedTags(post),
  );
</script>

<h1>
  Blog <a class="rss-icon" aria-label="rss" href="/blog/rss.xml"
    ><i class="fa-solid fa-rss"></i></a
  >
</h1>

<div class="font-trick" style="font-family:'Nerd Font';font-weight:bold;"></div>
<div class="font-trick" style="font-family:'Nerd Font';"></div>
{#if allTags.length}
  <div>
    <i class="fa-solid fa-filter"></i>
    {#each allTags as tag}
      <button
        class="tag-btn"
        on:click={() => toggleTag(tag)}
        class:selected={selectedTags.has(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
{/if}

<div style="padding-bottom:20px;">
  {#each postsMatchingFilters as post (post.slug)}
    <div animate:flip={{ duration: 150 }}>
      <div
        class="post-details"
        in:scale={{ duration: 150 }}
        out:scale={{ duration: 150 }}
      >
        <div class="row">
          <a class="post-title" href={`/blog/${post.slug}`}
            >{post.metadata.title}</a
          >
          {#if post.metadata.tags}
            <span class="tag-list">
              <span style="font-family:'Nerd Font'; padding-right:0.5em"
                >
              </span>
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
