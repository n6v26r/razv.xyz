<script lang="ts">
	import { onMount } from "svelte";
	import "../app.scss";
	import Navbar from "$lib/components/navbar.svelte";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { fly, fade } from "svelte/transition";

	export let data;
	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>


<svelte:head>
	<script>
		function updateTheme(document) {
			const theme = localStorage.getItem("theme") ?? "system";
			document.documentElement.setAttribute("data-theme", theme);
		}
		updateTheme(document);
	</script>
</svelte:head>

<Navbar />

<div class="page-content">
	{#if visible}
		<div transition:fade|local>
			<style lang="scss">
				@use "../assets/typesetting.scss";
			</style>
			{#key data.currentPath}
				<div
					in:fly={{ y: -50, duration: 150, delay: 150 }}
					out:fly={{ y: -50, duration: 150 }}
					class="page-wrapper"
				>
					<slot />
				</div>
			{/key}
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		min-height: 100%;
	}

	.page-content {
		container-type: inline-size;

		overflow: auto;
		background-color: var(--base);
		margin-top: 0;
		margin-bottom: 0;
		max-width: 1500px;
		min-height: calc(100dvh - var(--height-nav));
		margin-left: auto;
		margin-right: auto;
		-webkit-box-shadow: 0 0 10px var(--crust);
		box-shadow: 0 0 10px var(--crust);
		@media only screen and (max-width: 1500px) {
			box-sizing: border-box;
			width: 100%;
			padding-left: calc(
				7.5dvw + (300 - 7.5) * ((100dvw - 600px) / (1500 - 600))
			);
			padding-right: calc(
				7.5dvw + (300 - 7.5) * ((100dvw - 600px) / (1500 - 600))
			);
		}
		@media only screen and (max-width: 600px) {
			box-sizing: border-box;
			width: 100%;
			padding-left: 7.5dvw;
			padding-right: 7.5dvw;
		}
		@media only screen and (max-width: 285px) {
			box-sizing: border-box;
			width: 100%;
			padding-left: 0;
			padding-right: 0;
		}
		@media only screen and (min-width: 1501px) {
			box-sizing: content-box;
			width: 50%;
			padding-left: 5%;
			padding-right: 5%;
		}
	}
</style>
