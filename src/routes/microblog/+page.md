<h1>Microblog</h1>
<p align="center"><sup>Silly lil place for silly lil thoughts</sup></p>

<div class="entry">

I'm sick of brainrot, let's bring back 2000's emo culture! Nostalgia for times you never lived is so real...

Is "OwO" (and variations) the modern equivalent for "rawr XD"?

<div class="post-date">25/12/2025</div>
</div>

<div class="entry">
<p align="center" class="funtext">Merry xmas guys!</p>

```cpp
#include <stdio.h>

int main() {
  long long x[] = {7879083254067914061, 2192225};
  printf("%s\n", (char *)x);

  return 0;
}
```

<div class="post-date">25/12/2025</div>
</div>

<div class="entry">

Font subsetting is so op.<br/>
Just went 1.2MB to 22KB! I's speeeedy now yuhuu!

<div class="post-date">20/12/2025</div>
</div>

<div class="entry">

Why do programmers confuse Halloween and Christmas?<br />
'Cause 25 dec = 31 oct.

<div class="post-date">16/12/2025</div>
</div>

<style lang="scss">
  div.entry {
    background-color: var(--mantle);
    margin-bottom: var(--space-lg);
    padding: 1em;
    border-radius: var(--border-radius-large);

    p {
      margin-top: 0;
    }
  }

  div.post-date {
    color: var(--subtext0);
    margin-top: var(--space-md);

    &:before {
      font-family: "Nerd Font", monospace;
      content: "󰢧";
      margin-right: 10px;
    }
  }

  .funtext{
    font-family: "VictorMono Nerd Font";
    font-size: 1.2rem;
    font-weight: bold;
    background-image: linear-gradient(90deg,
      var(--yellow),
      var(--peach),
      var(--green),
      var(--pink),
      var(--lavender),
      var(--blue),
      var(--red));
    color:transparent;
    background-clip:text;
    font-style: italic;
    text-decoration: underline dashed var(--accent);
}
</style>

<script lang="ts">
import "../../assets/prism.scss";
import "katex/dist/katex.min.css";
import Alert from "../../lib/components/Alert.svelte"
</script>
