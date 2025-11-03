<script lang="ts">
  type Alert = "note" | "tip" | "important" | "warning" | "caution" | "controversial";
  type ContentType = "quote" | "label";
  type DisplayType = "block" | "inline";
  export let type: Alert = "note";
  export let content: ContentType = "quote";
  export let display: DisplayType = "block";

  function getLabel(type: Alert) {
    switch (type) {
      case "note":
        return `<i class="fa-solid fa-circle-info"></i> Note`;
      case "tip":
        return `<i class="fa-solid fa-lightbulb"></i> Tip`;
      case "important":
        return `<i class="fa-solid fa-star"></i> Important`;
      case "warning":
        return `<i class="fa-solid fa-triangle-exclamation"></i> Warning`;
      case "caution":
        return `<i class="fa-solid fa-circle-xmark"></i> Caution`;
      case "controversial":
        return `<i class="fa-solid fa-thumbs-down"></i> Controversial`;
      default:
        return "";
    }
  }
</script>

{#if content === "quote"}
  <blockquote class={type}>
    <span class={type}>
      {@html getLabel(type)}
    </span>
    {#if display === "block"}
      <br />
    {/if}
    <slot></slot>
  </blockquote>
{/if}
{#if content === "label"}
  <span class={type}>{@html getLabel(type)}</span>
  {#if display === "block"}
    <br />
  {/if}
{/if}

<style>

  blockquote.note {
    border-color: var(--blue);
  }

  blockquote.tip {
    border-color: var(--green);
  }

  blockquote.important {
    border-color: var(--yellow);
  }

  blockquote.warning {
    border-color: var(--peach);
  }

  blockquote.caution {
    border-color: var(--red);
  }
  
  blockquote.controversial {
    border-color: var(--maroon);
  }

  span {
    &.note,
    &.tip,
    &.important,
    &.warning,
    &.caution,
    &.controversial {
      font-family: "Fira Code";
      font-weight: bold;
    }
  }

  span.note {
    color: var(--blue);
  }

  span.tip {
    color: var(--green);
  }

  span.important {
    color: var(--yellow);
  }

  span.warning {
    color: var(--peach);
  }

  span.caution {
    color: var(--red);
  }

  span.controversial {
    color: var(--maroon);
  }
</style>
