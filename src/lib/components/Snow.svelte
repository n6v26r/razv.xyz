<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  interface Flake {
    x: number;
    y: number;
    r: number;
    vy: number;
    vx: number;
    rot: number;
    rotSpeed: number;
  }

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let flakes: Flake[] = [];
  let raf: number | null = null;
  let running = true;

  let snowColor = "rgba(255,255,255,0.85)";
  let themeObserver: MutationObserver | null = null;

  const dpr = browser ? window.devicePixelRatio || 1 : 1;

  function readSnowColor() {
    if (!browser) return;
    const rgb = getComputedStyle(document.documentElement)
      .getPropertyValue("--text")
      .trim();
    snowColor = rgb || "rgba(255,255,255,0.85)";
  }

  function resize() {
    if (!canvas) return;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }

  function createFlakes() {
    if (!canvas) return;

    const area = window.innerWidth * window.innerHeight;
    const count = Math.min(Math.max(3, Math.floor(area / 250000)), 50);

    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 1,
      vy: Math.random() * 1 + 0.4,
      vx: Math.random() * 0.6 - 0.3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: Math.random() * 0.01 - 0.005,
    }));
  }

  function update() {
    for (const f of flakes) {
      f.y += f.vy;
      f.x += f.vx;
      f.rot += f.rotSpeed;

      if (f.y > window.innerHeight + f.r * 4) f.y = -f.r * 4;
      if (f.x < -f.r * 4) f.x = window.innerWidth + f.r * 4;
      if (f.x > window.innerWidth + f.r * 4) f.x = -f.r * 4;
    }
  }

  function drawSnowflake(ctx: CanvasRenderingContext2D, r: number) {
    const arms = 6;
    for (let i = 0; i < arms; i++) {
      ctx.rotate(Math.PI / 3);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, r);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, r * 0.6);
      ctx.lineTo(-r * 0.25, r * 0.8);
      ctx.moveTo(0, r * 0.6);
      ctx.lineTo(r * 0.25, r * 0.8);
      ctx.stroke();
    }
  }

  function draw() {
    if (!running || !ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = snowColor;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    for (const f of flakes) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      drawSnowflake(ctx, f.r * 4);
      ctx.restore();
    }

    update();
    raf = requestAnimationFrame(draw);
  }

  function pause() {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  function resume() {
    if (!running) {
      running = true;
      draw();
    }
  }

  function handleVisibility() {
    document.hidden ? pause() : resume();
  }

  onMount(() => {
    if (!browser || !canvas) return;

    ctx = canvas.getContext("2d");
    resize();
    readSnowColor();
    createFlakes();
    draw();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    themeObserver = new MutationObserver(readSnowColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
  });

  onDestroy(() => {
    pause();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", handleVisibility);
    themeObserver?.disconnect();
  });
</script>

{#if browser}
  <canvas
    bind:this={canvas}
    aria-hidden="true"
    style="
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
    "
  ></canvas>
{/if}
