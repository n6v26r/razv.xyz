<!--- Credit to the catppuccin website for the themeSwitcher mechanism theme css. --->
<script lang="ts">
  import type { FlavorName } from "@catppuccin/palette";
  import { browser } from "$app/environment";
  import { fly, scale, slide } from "svelte/transition";
  import { clickOutside } from "$lib/clickoutside";
  import { systemThemePreference } from "$lib/stores/theme";
  type Theme = FlavorName | "system";

  const themes: {
    id: Theme;
    name: string;
    emoji: string;
  }[] = [
    { id: "system", name: "System", emoji: "🖥️" },
    { id: "latte", name: "Latte", emoji: "🌻" },
    { id: "frappe", name: "Frappé", emoji: "🪴" },
    { id: "macchiato", name: "Macchiato", emoji: "🌺" },
    { id: "mocha", name: "Mocha", emoji: "🌿" },
  ];

  let currentTheme = $state(
    browser
      ? ((localStorage.getItem("theme") as Theme | undefined) ?? "system")
      : "system",
  );

  let themeMenuDropdownShow = $state(false);
  const themeMenuDropdownAnimDur = 150;

  function _setTheme(selectedTheme: Theme) {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    if (browser) localStorage.setItem("theme", selectedTheme);
    currentTheme = selectedTheme;
  }

  async function setTheme(selectedTheme: Theme) {
    themeMenuDropdownShow = false;
    if (selectedTheme == currentTheme) return;

    if (
      !document.startViewTransition ||
      (currentTheme == "system" && selectedTheme === $systemThemePreference) ||
      (selectedTheme == "system" && currentTheme === $systemThemePreference)
    ) {
      _setTheme(selectedTheme);
      return;
    }

    setTimeout(() => {
      document.startViewTransition(async () => {
        _setTheme(selectedTheme);
      });
    }, themeMenuDropdownAnimDur);
  }

  let themeMenuBtn = $state(null);
</script>

<div class="theme-menu">
  <button
    bind:this={themeMenuBtn}
    aria-label="theme"
    class="theme-menu-btn"
    onclick={() => {
      themeMenuDropdownShow = !themeMenuDropdownShow;
    }}
  >
    <i style="color:var(--accent);" class="fa-solid fa-brush"></i>
  </button>
</div>
{#if themeMenuDropdownShow}
  <div
    class="theme-menu-dropdown"
    transition:fly={{
      duration: themeMenuDropdownAnimDur,
      x: -10,
      y: 10,
      opacity: 0,
    }}
    use:clickOutside={{
      callback: () => (themeMenuDropdownShow = false),
      ignore: [themeMenuBtn],
    }}
  >
    {#each themes as option}
      <button
        class:active={currentTheme === option.id}
        class="theme-option"
        onclick={() => setTheme(option.id)}
      >
        {option.emoji}
        {option.name}
      </button>
    {/each}
  </div>
{/if}

<style lang="scss">
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes move-out {
    0% {
      clip-path: circle(150% at 100% 0%);
    }

    100% {
      clip-path: circle(0% at 100% 0%);
    }
  }

  :root::view-transition-old(root) {
    animation: 500ms linear both move-out;
    z-index: 10;
  }

  :root::view-transition-new(root) {
    z-index: 9;
  }

  .theme-menu {
    overflow: visible;
    position: absolute;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 1%;
    height: 100%;
  }

  .theme-menu-btn {
    appearance: none;
    -webkit-apparence: none;
    border: none;
    background-color: var(--crust);
  }

  .active {
    font-style: italic;
    font-weight: 1000;
  }

  .theme-menu-dropdown {
    will-change: transform;
    transform: translateZ(0);
    overflow: hidden;
    z-index: 10;
    position: absolute;
    text-align: left;
    display: grid;
    align-items: left;
    top: 100%;
    right: 1%;

    border-radius: var(--border-radius-normal);
    border: var(--border-smallish) solid var(--blue);
    transition: all 0.1s;
    margin: 0;
    background-color: var(--base);
  }

  .theme-option {
    font-family: "Lexend";
    appearance: none;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    border: none;
    outline: none;

    background-color: var(--base);
    text-align: left;

    height: 1.5rem;
    width: 100%;

    &:hover {
      background-color: var(--blue);
    }

    @media only screen and (max-width: 900px) {
      height: 2rem;
    }
  }
</style>
