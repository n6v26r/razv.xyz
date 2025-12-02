<script>
	import "../../assets/prism.scss";
	import "katex/dist/katex.min.css";
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/Fira_Code_NF/FiraCodeNerdFont-Bold.ttf"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/Fira_Code_NF/FiraCodeNerdFont-Medium.ttf"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="page-wrapper">
	<slot />
</div>
