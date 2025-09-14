<div class="outer-wrapper">
  <div class="wrapper">
        <h1>404 Not Found</h1>
        <span>( ˶°ㅁ°) !!</span>
    <p style="text-align:center;">
      Ops! The page you're looking for could not be found.
    </p>
    <p class="under" style="text-align:center;">Go back to <a href="/">home</a></p>
  </div>
</div>

<style>
  .outer-wrapper {
    display: flex;
    justify-content: center;
    height: calc(100dvh - var(--height-nav));
    align-items: center;
  }

  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    color: var(--blue);
    margin-top: 0;
  }

  span {
    color: var(--blue);
    font-weight:bold;
  }

  p.under {
    margin-top: 0;
  }
</style>
