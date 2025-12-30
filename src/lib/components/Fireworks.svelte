<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    alpha: number;
    color: string;
    size: number;
  }

  interface Rocket {
    x: number;
    y: number;
    vy: number;
    exploded: boolean;
    targetY: number;
    color: string;
  }

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  let particles: Particle[] = [];
  let rockets: Rocket[] = [];
  let raf: number | null = null;
  let running = true;

  // const gravity = 0.045;
  const gravity = 0.02;
  const dpr = window.devicePixelRatio || 1;
  // const screenFactor =
  //   Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 1000;
  const screenFactor = Math.min(
    (window.innerWidth * window.innerHeight) / 250000,
    2,
  );

  let rocketsLaunched = 0;

  let colors: string[] = [];
  let rocketColor = "#ffffff";
  let themeObserver: MutationObserver | null = null;

  const colorVars = [
    "--peach",
    "--blue",
    "--red",
    "--maroon",
    "--mauve",
    "--pink",
    "--green",
    "--lavender",
  ];

  function readFireworkColors() {
    const styles = getComputedStyle(document.documentElement);

    colors = colorVars
      .map((v) => styles.getPropertyValue(v).trim())
      .filter(Boolean);

    rocketColor = styles.getPropertyValue("--text").trim() || "#ffffff";

    if (!colors.length) colors = ["#ffffff"];
  }

  function resize() {
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function launchRocket(color: string) {
    rockets.push({
      x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
      y: window.innerHeight,
      vy: Math.random() * -3.5 - 4.5,
      exploded: false,
      targetY:
        Math.random() * window.innerHeight * 0.45 + window.innerHeight * 0.15,
      color: color,
    });
  }

  function explode(x: number, y: number, color: string) {
    const count = Math.floor((60 + Math.random() * 40) * screenFactor);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (1.5 + Math.random() * 1.5) * screenFactor;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.floor((30 + Math.random() * 20) * screenFactor),
        maxLife: 50,
        alpha: 1,
        color: color,
        size: Math.random() * 2 + 1.5,
      });
    }
  }

  let lastTime = performance.now();

  function update() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    rockets.forEach((r) => {
      r.y += r.vy * 60 * deltaTime;
      r.vy += gravity * 0.0001 * 60 * deltaTime;

      if (!r.exploded && r.y <= r.targetY) {
        r.exploded = true;
        explode(r.x, r.y, r.color);
      }
    });

    rockets = rockets.filter((r) => !r.exploded);

    particles.forEach((p) => {
      p.x += p.vx * 60 * deltaTime;
      p.y += p.vy * 60 * deltaTime;
      p.vy += gravity * 60 * deltaTime;
      p.life--;

      p.alpha = Math.min(1, p.life / p.maxLife);
    });

    particles = particles.filter((p) => p.life > 0);
  }

  function draw() {
    if (!running || !ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.shadowBlur = 10;
    ctx.shadowColor = rocketColor;

    ctx.fillStyle = rocketColor;
    rockets.forEach((r) => {
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach((p) => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    update();

    if (
      rockets.length === 0 &&
      particles.length === 0 &&
      rocketsLaunched == colors.length
    ) {
      setTimeout(pause, 500);
    }

    // if (Math.random() < 0.06) launchRocket();

    raf = requestAnimationFrame(draw);
  }

  function pause() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
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
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    resize();
    readFireworkColors();
    for (let i = 0; i < colors.length; i++) {
      setTimeout(() => {
        launchRocket(colors[i]);
        rocketsLaunched++;
      }, i * 300);
    }
    draw();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    themeObserver = new MutationObserver(readFireworkColors);
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
