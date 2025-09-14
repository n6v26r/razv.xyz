import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type FlavorName } from "@catppuccin/palette"

let systemThemePreference = "mocha";
export const theme = writable(systemThemePreference);

if (browser) {
	const html = document.documentElement;
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		systemThemePreference = "mocha"
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		systemThemePreference = event.matches ? "mocha" : "latte";

		if (browser) {
			const attr = html.getAttribute('data-theme');
			if (attr === 'system') {
				theme.set(systemThemePreference);
			}
		}
	});

	// Set initial value
	const currentTheme = html.getAttribute('data-theme');
	if (currentTheme === "system")
		theme.set(systemThemePreference)
	else
		theme.set(currentTheme);

	const observer = new MutationObserver(() => {
		const currentTheme = html.getAttribute('data-theme');
		if (currentTheme === "system")
			theme.set(systemThemePreference)
		else
			theme.set(currentTheme);
	});

	observer.observe(html, {
		attributes: true,
		attributeFilter: ['data-theme']
	});
}

