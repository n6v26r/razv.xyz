<script>
  let pages = [
    ["/", "home"],
    ["/blog", "blog"],
    ["/microblog", "µ"],
  ];
  import { page } from "$app/state";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<div class="nav-container">
  <nav>
    <div class="navbar-pages">
      {#each pages as [link, title]}
        <a
          href={link}
          class:active={link === "/" + page.url.pathname.split("/")[1]}
          >{title}</a
        >
      {/each}
    </div>
    <ThemeSwitcher />
  </nav>
</div>

<style lang="scss">
  .nav-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .navbar-pages {
    display: flex;
    gap: var(--space-nav);
  }

  nav {
    background-color: var(--crust);
    position: relative;
    margin: 0;
    vertical-align: middle;
    height: var(--height-nav);
    margin: 0;
    border-bottom: 2px dashed var(--surface2);

    width: 100%;
    max-width: calc(var(--max-width-content) + 2 * var(--padding-page-content));

    @media only screen and (min-width: 1501px) {
      width: calc(
        var(--width-page-content-def) + 2 * var(--padding-page-content)
      );
      // border-left: 2px dashed var(--surface2);
      // border-right: 2px dashed var(--surface2);
    }

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
        position: relative;
        transition: filter 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        position: relative;

        color: var(--accent);
        stroke: none;
        border: none;

        &:hover {
          text-shadow: none;
        }
      }

      @media (pointer: fine) {
        a:not(.active):hover {
          filter: brightness(135%);
        }
      }

      .active {
        &::before {
          content: "[";
          color: var(--text);

          position: absolute;
          left: -0.6em;
        }
        &::after {
          content: "]";
          color: var(--text);

          position: absolute;
          right: -0.6em;
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
