<script>
  let pages = [
    ["/", "home"],
    ["/blog", "blog"],
  ];
  import { page } from "$app/state";
  import ThemeSwitcher from "./themeSwitcher.svelte";
</script>

<nav>
  <div class="navbar-pages">
    {#each pages as [link, title]}
      <a
        href={link}
        class:active={link ===
          "/" + page.url.pathname.split("/")[1]}>{title}</a
      >
    {/each}
  </div>
  <ThemeSwitcher />
</nav>

<style lang="scss">
  .navbar-pages {
    display: flex;
    gap: var(--space-nav);
  }

  nav {
    background-color: var(--crust);
    position: relative;
    // overflow: hidden;
    margin: 0;
    vertical-align: middle;
    height: var(--height-nav);
    margin: 0;

    .navbar-pages {
      font-family: "Fira Code";
      position: relative;
      overflow: hidden;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      height: 100%;

      a {
        transition: color 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        position: relative;

        background-color: var(--crust);
        color: var(--blue);
        stroke: none;
        border: none;

        &:hover {
          text-shadow: none;
        }
      }

      @media (pointer: fine) {
        a:not(.active):hover {
          color: var(--lavender);
        }
      }

      .active {
        &::before {
          content: "[";
          color: var(--text);
        }
        &::after {
          content: "]";
          color: var(--text);
        }
      }

      @keyframes textFade {
        to {
          opacity: 1;
        }
      }
    } // End navbar-pages
  }
</style>
