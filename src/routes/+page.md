---
title: "Hi"
date: 02/07/2025
---

<script lang="ts">
  import {theme} from "$lib/stores/theme"

  let timeString = $state('');
  let age = $state();
  const birthday = new Date("2009-05-25T12:30:00+03:00");
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
      age = ((now.getTime() - birthday.getTime())/(1000*60*60*24*365.25)).toFixed(6);
   }
  setInterval(updateDate, 500);
  updateDate();

</script>

<!-- svelte-ignore css_unused_selector -->
<style>

span.myname{
  color: var(--red);
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

:is(h2, h3, h4, h5, h6) {
  cursor: auto;
}

pre.cat {
  text-size-adjust: none;
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;

  font-family: "LXGW WenKai Mono TC", monospace;
  font-weight: bold;
}

</style>

# {title}

<div align=center>

I'm <span class="myname">Răzvan</span>.

I'm a {age} y/o guy from Romania who enjoys cool things, especially computers.

Usernames: **razv** or **n6v26r**. 
</div>

## About

Highschool student who tries to do **way** too many things and miraculously succedes.

<div class="split"
id="edge"
>
<div>

- competitive programming enjoyer 
- favourite languages: C/C++ and Rust
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
- I tend to use (too) many parantheses
- I hate frontend development

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
- <i class="fa-solid fa-envelope"></i> <a href="mailto:n6v26r@gmail.com">n6v26r@gmail.com</a>
<br/>
- <i class="fa-brands fa-github"></i> <a href="https://github.com/n6v26r">n6v26r</a>
