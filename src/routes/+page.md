---
title: "Hi"
date: 02/07/2025
---

<script lang="ts">
  import {theme} from "$lib/stores/theme"
  import NowPlaying from "$lib/components/NowPlaying.svelte"

  let timeString = $state('');
  function updateDate(){
   const now = new Date();

      // Format the time for EETC (Eastern European Time UTC+2)
      const options:Intl.DateTimeFormatOptions = {
          timeZone: 'Europe/Bucharest',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
      };
      timeString = now.toLocaleTimeString('en-GB', options);
   }
  setInterval(updateDate, 500);
  updateDate();

</script>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">

span.myname{
  color: var(--highlight);
  font-weight: bold;
}

.split{
  justify-content: space-around;
}

@container (width >= 40em) {
  .split{
      display: flex;
  }
}

@container (width >= 30em) {
  .split#edge{
      display: flex;
  }
}

pre.cat {
  text-size-adjust: none;
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;

  font-family: "LXGW WenKai Mono TC", monospace;
  font-weight: bold;
}

a.webring, a.webring-arrow {
  text-decoration: none !important;
  &:after {
    content: "" !important;
  }
}
a.webring {
  text-decoration: none;
  color: var(--text);
  &:after {
    content: "";
  }
}

a.ctp-webring {
  color: var(--inverted-text);
  background-image: var(--gradient);
  background-size: 200% 200%;
  border-radius: var(--border-radius-normal);
  padding: 4px;

  transition: background-position 1s ease;

  &:hover{
    text-shadow: 0px 0px 0px;
    background-position: 100% 50%;
  }
}

.now-playing-container {
  display: inline;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

</style>

# {title}

<div align=center>

I'm <span class="myname">Răzvan</span>.

I'm just a random guy who enjoys cool things, especially computers.

Usernames: **razv** or **n6v26r**. 
</div>

## About

Highschool student who tries to do **way** too many things and miraculously succedes.

<div class="split"
id="edge"
>
<div>

- competitive programming enjoyer 
- favourite languages: C/C++ and Zig
- big nerd :3 <sub>(no shit sherlock)</sub>
- FOSS enthusiast

Check out the [blog](/blog)!
</div>

<div
  style = "display:flex;flex:1;align-items:center;justify-content:center;"
>

<pre class="cat">
  ／l、 
（ﾟ､ ｡７
  l   ~ヽ
  じしf_,)ノ
</pre>

</div>
</div>

<div class="split">
<div>

### Some random facts

- Right now it's <code>{timeString}</code> for me
- I hate frontend development
- Music playing: <div class="now-playing-container"><NowPlaying/></div>

</div>
<div>

### I like
- compilers and interpreters
- game theory
- cats

</div>
</div>

## Digital presence

<!---- TODO: Add more--->

- <i class="fa-brands fa-signal-messenger"></i> <a href="https://signal.me/#eu/CY2eS_T0Q0uIvjGCZoxtip5SUjkgng3xRtGagXE5L-mF0YrzP1dNqrMY4AIBmgEM"> razv</a>
- <i class="fa-brands fa-telegram"></i> <a href="https://t.me/n6v26r">n6v26r</a>
- <i class="fa-brands fa-discord"></i> <a href="https://discord.com/users/820945163677335603">razv.islazy</a>
- <i class="fa-solid fa-envelope"></i> <a href="mailto:razv@razv.xyz">razv@razv.xyz</a>
<br/>
- <i class="fa-brands fa-github"></i> <a href="https://github.com/n6v26r">n6v26r</a>

<br/>
<p align=center>
<a class="webring-arrow" href="https://ctp-webr.ing/razv/previous"><i class="fa-solid fa-arrow-left"></i></a>
<a class="webring ctp-webring" href="https://ctp-webr.ing">catppuccin</a>
<a class="webring-arrow" href="https://ctp-webr.ing/razv/next"><i class="fa-solid fa-arrow-right"></i></a>
</p>
